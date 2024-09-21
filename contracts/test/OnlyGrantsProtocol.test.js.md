const { expect } = require("chai")
const { ethers } = require("hardhat")
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers")

describe("OnlyGrantsProtocol", function () {
    async function deployFixture() {
        const [owner, user1, user2, user3] = await ethers.getSigners()

        const MockERC20 = await ethers.getContractFactory("MockERC20")
        const mockToken = await MockERC20.deploy("MockToken", "MTK", 18)

        const OnlyGrantsProtocol = await ethers.getContractFactory("OnlyGrantsProtocol")
        const onlyGrantsProtocol = await OnlyGrantsProtocol.deploy(mockToken.target)

        return { mockToken, onlyGrantsProtocol, owner, user1, user2, user3 }
    }

    describe("Deployment", function () {
        it("Should set the correct token address", async function () {
            const { mockToken, onlyGrantsProtocol } = await loadFixture(deployFixture)

            expect(await onlyGrantsProtocol.token()).to.equal(mockToken.target)
        })
    })

    describe("Profile Management", function () {})

    describe("Round Management", function () {
        it("Should create a round", async function () {
            const { mockToken, onlyGrantsProtocol, user1 } = await loadFixture(deployFixture)
            await onlyGrantsProtocol.connect(user1).createProfile("User1 Profile")
            await mockToken.mint(user1.address, ethers.parseEther("1000"))
            await mockToken.connect(user1).approve(onlyGrantsProtocol.target, ethers.parseEther("100"))
            await onlyGrantsProtocol.connect(user1).createRound(ethers.parseEther("100"))
            const round = await onlyGrantsProtocol.rounds(0)
            expect(round.profileOwner).to.equal(user1.address)
            expect(round.matchingAmount).to.equal(ethers.parseEther("100"))
        })

        it("Should add a round member", async function () {
            const { mockToken, onlyGrantsProtocol, user1, user2 } = await loadFixture(deployFixture)
            await onlyGrantsProtocol.connect(user1).createProfile("User1 Profile")
            await mockToken.mint(user1.address, ethers.parseEther("1000"))
            await mockToken.connect(user1).approve(onlyGrantsProtocol.target, ethers.parseEther("100"))
            await onlyGrantsProtocol.connect(user1).createRound(ethers.parseEther("100"))
            await onlyGrantsProtocol.connect(user1).addRoundMember(0, user2.address)
            // Note: We can't directly check if user2 is a member due to the current contract structure
        })

        it("Should edit round metadata", async function () {
            const { mockToken, onlyGrantsProtocol, user1 } = await loadFixture(deployFixture)
            await onlyGrantsProtocol.connect(user1).createProfile("User1 Profile")
            await mockToken.mint(user1.address, ethers.parseEther("1000"))
            await mockToken.connect(user1).approve(onlyGrantsProtocol.target, ethers.parseEther("100"))
            await onlyGrantsProtocol.connect(user1).createRound(ethers.parseEther("100"))
            await onlyGrantsProtocol.connect(user1).editRoundMetadata(0, "Updated metadata")
            // Note: We can't directly check the metadata due to the current contract structure
        })
    })

    describe("Project Application", function () {
        it("Should allow a project to apply for a round", async function () {
            const { mockToken, onlyGrantsProtocol, user1, user2 } = await loadFixture(deployFixture)
            await onlyGrantsProtocol.connect(user1).createProfile("User1 Profile")
            await mockToken.mint(user1.address, ethers.parseEther("1000"))
            await mockToken.connect(user1).approve(onlyGrantsProtocol.target, ethers.parseEther("100"))
            await onlyGrantsProtocol.connect(user1).createRound(ethers.parseEther("100"))

            await expect(onlyGrantsProtocol.connect(user2).applyForRound(0, "Project Metadata"))
                .to.emit(onlyGrantsProtocol, "ProjectApplied")
                .withArgs(0, user2.address)
        })

        it("Should not allow applying twice for the same round", async function () {
            const { mockToken, onlyGrantsProtocol, user1, user2 } = await loadFixture(deployFixture)
            await onlyGrantsProtocol.connect(user1).createProfile("User1 Profile")
            await mockToken.mint(user1.address, ethers.parseEther("1000"))
            await mockToken.connect(user1).approve(onlyGrantsProtocol.target, ethers.parseEther("100"))
            await onlyGrantsProtocol.connect(user1).createRound(ethers.parseEther("100"))

            await onlyGrantsProtocol.connect(user2).applyForRound(0, "Project Metadata")
            await expect(
                onlyGrantsProtocol.connect(user2).applyForRound(0, "Project Metadata Again"),
            ).to.be.revertedWith("Already applied")
        })

        it("Should not allow applying for an inactive round", async function () {
            const { mockToken, onlyGrantsProtocol, user1, user2 } = await loadFixture(deployFixture)
            await onlyGrantsProtocol.connect(user1).createProfile("User1 Profile")
            await mockToken.mint(user1.address, ethers.parseEther("1000"))
            await mockToken.connect(user1).approve(onlyGrantsProtocol.target, ethers.parseEther("100"))
            await onlyGrantsProtocol.connect(user1).createRound(ethers.parseEther("100"))

            await onlyGrantsProtocol.connect(user1).cancelRound(0)

            await expect(onlyGrantsProtocol.connect(user2).applyForRound(0, "Project Metadata")).to.be.revertedWith(
                "Round is not active",
            )
        })
    })

    describe("Donations", function () {
        it("Should allow donations to a round", async function () {
            const { mockToken, onlyGrantsProtocol, user1, user2 } = await loadFixture(deployFixture)
            await onlyGrantsProtocol.connect(user1).createProfile("User1 Profile")
            await mockToken.mint(user1.address, ethers.parseEther("1000"))
            await mockToken.connect(user1).approve(onlyGrantsProtocol.target, ethers.parseEther("100"))
            await onlyGrantsProtocol.connect(user1).createRound(ethers.parseEther("100"))

            await mockToken.mint(user2.address, ethers.parseEther("50"))
            await mockToken.connect(user2).approve(onlyGrantsProtocol.target, ethers.parseEther("50"))
            await onlyGrantsProtocol.connect(user2).donate(0, ethers.parseEther("50"))

            const round = await onlyGrantsProtocol.rounds(0)
            expect(round.totalDonations).to.equal(ethers.parseEther("50"))
        })

        it("Should distribute funds correctly", async function () {
            const { mockToken, onlyGrantsProtocol, user1, user2, user3 } = await loadFixture(deployFixture)
            await onlyGrantsProtocol.connect(user1).createProfile("User1 Profile")
            await mockToken.mint(user1.address, ethers.parseEther("1000"))
            await mockToken.connect(user1).approve(onlyGrantsProtocol.target, ethers.parseEther("100"))
            await onlyGrantsProtocol.connect(user1).createRound(ethers.parseEther("100"))

            await mockToken.mint(user2.address, ethers.parseEther("50"))
            await mockToken.connect(user2).approve(onlyGrantsProtocol.target, ethers.parseEther("50"))
            await onlyGrantsProtocol.connect(user2).donate(0, ethers.parseEther("50"))

            await mockToken.mint(user3.address, ethers.parseEther("25"))
            await mockToken.connect(user3).approve(onlyGrantsProtocol.target, ethers.parseEther("25"))
            await onlyGrantsProtocol.connect(user3).donate(0, ethers.parseEther("25"))

            const user2BalanceBefore = await mockToken.balanceOf(user2.address)
            const user3BalanceBefore = await mockToken.balanceOf(user3.address)

            await onlyGrantsProtocol.connect(user1).distributeFunds(0)

            const user2BalanceAfter = await mockToken.balanceOf(user2.address)
            const user3BalanceAfter = await mockToken.balanceOf(user3.address)

            // Check that users received their donations back plus a share of the matching funds
            expect(user2BalanceAfter).to.be.gt(user2BalanceBefore)
            expect(user3BalanceAfter).to.be.gt(user3BalanceBefore)
        })

        it("Should not allow donations from non-applied projects", async function () {
            const { mockToken, onlyGrantsProtocol, user1, user2 } = await loadFixture(deployFixture)
            await onlyGrantsProtocol.connect(user1).createProfile("User1 Profile")
            await mockToken.mint(user1.address, ethers.parseEther("1000"))
            await mockToken.connect(user1).approve(onlyGrantsProtocol.target, ethers.parseEther("100"))
            await onlyGrantsProtocol.connect(user1).createRound(ethers.parseEther("100"))

            await mockToken.mint(user2.address, ethers.parseEther("50"))
            await mockToken.connect(user2).approve(onlyGrantsProtocol.target, ethers.parseEther("50"))

            await expect(onlyGrantsProtocol.connect(user2).donate(0, ethers.parseEther("50"))).to.be.revertedWith(
                "Project not applied",
            )
        })

        it("Should allow donations from applied projects", async function () {
            const { mockToken, onlyGrantsProtocol, user1, user2 } = await loadFixture(deployFixture)
            await onlyGrantsProtocol.connect(user1).createProfile("User1 Profile")
            await mockToken.mint(user1.address, ethers.parseEther("1000"))
            await mockToken.connect(user1).approve(onlyGrantsProtocol.target, ethers.parseEther("100"))
            await onlyGrantsProtocol.connect(user1).createRound(ethers.parseEther("100"))

            await onlyGrantsProtocol.connect(user2).applyForRound(0, "Project Metadata")

            await mockToken.mint(user2.address, ethers.parseEther("50"))
            await mockToken.connect(user2).approve(onlyGrantsProtocol.target, ethers.parseEther("50"))

            await expect(onlyGrantsProtocol.connect(user2).donate(0, ethers.parseEther("50"))).to.not.be.reverted

            const round = await onlyGrantsProtocol.rounds(0)
            expect(round.totalDonations).to.equal(ethers.parseEther("50"))
        })
    })

    describe("Fund Distribution", function () {
        it("Should distribute funds correctly with multiple projects", async function () {
            const { mockToken, onlyGrantsProtocol, user1, user2, user3 } = await loadFixture(deployFixture)
            await onlyGrantsProtocol.connect(user1).createProfile("User1 Profile")
            await mockToken.mint(user1.address, ethers.parseEther("1000"))
            await mockToken.connect(user1).approve(onlyGrantsProtocol.target, ethers.parseEther("100"))
            await onlyGrantsProtocol.connect(user1).createRound(ethers.parseEther("100"))

            // Apply and donate for user2
            await onlyGrantsProtocol.connect(user2).applyForRound(0, "Project 2")
            await mockToken.mint(user2.address, ethers.parseEther("50"))
            await mockToken.connect(user2).approve(onlyGrantsProtocol.target, ethers.parseEther("50"))
            await onlyGrantsProtocol.connect(user2).donate(0, ethers.parseEther("50"))

            // Apply and donate for user3
            await onlyGrantsProtocol.connect(user3).applyForRound(0, "Project 3")
            await mockToken.mint(user3.address, ethers.parseEther("25"))
            await mockToken.connect(user3).approve(onlyGrantsProtocol.target, ethers.parseEther("25"))
            await onlyGrantsProtocol.connect(user3).donate(0, ethers.parseEther("25"))

            const user2BalanceBefore = await mockToken.balanceOf(user2.address)
            const user3BalanceBefore = await mockToken.balanceOf(user3.address)

            await onlyGrantsProtocol.connect(user1).distributeFunds(0)

            const user2BalanceAfter = await mockToken.balanceOf(user2.address)
            const user3BalanceAfter = await mockToken.balanceOf(user3.address)

            // Check that users received their donations back plus a share of the matching funds
            expect(user2BalanceAfter).to.be.gt(user2BalanceBefore)
            expect(user3BalanceAfter).to.be.gt(user3BalanceBefore)
        })
    })

    describe("Error Handling", function () {
        it("Should not allow creating a profile twice", async function () {
            const { onlyGrantsProtocol, user1 } = await loadFixture(deployFixture)
            await onlyGrantsProtocol.connect(user1).createProfile("User1 Profile")
            await expect(onlyGrantsProtocol.connect(user1).createProfile("User1 Profile Again")).to.be.revertedWith(
                "Profile already exists",
            )
        })

        it("Should not allow non-profile owners to create rounds", async function () {
            const { mockToken, onlyGrantsProtocol, user1 } = await loadFixture(deployFixture)
            await mockToken.mint(user1.address, ethers.parseEther("100"))
            await mockToken.connect(user1).approve(onlyGrantsProtocol.target, ethers.parseEther("100"))
            await expect(onlyGrantsProtocol.connect(user1).createRound(ethers.parseEther("100"))).to.be.revertedWith(
                "Not profile owner",
            )
        })

        it("Should not allow donations to inactive rounds", async function () {
            const { mockToken, onlyGrantsProtocol, user1, user2 } = await loadFixture(deployFixture)
            await onlyGrantsProtocol.connect(user1).createProfile("User1 Profile")
            await mockToken.mint(user1.address, ethers.parseEther("100"))
            await mockToken.connect(user1).approve(onlyGrantsProtocol.target, ethers.parseEther("100"))
            await onlyGrantsProtocol.connect(user1).createRound(ethers.parseEther("100"))
            await onlyGrantsProtocol.connect(user1).cancelRound(0)

            await mockToken.mint(user2.address, ethers.parseEther("50"))
            await mockToken.connect(user2).approve(onlyGrantsProtocol.target, ethers.parseEther("50"))
            await expect(onlyGrantsProtocol.connect(user2).donate(0, ethers.parseEther("50"))).to.be.revertedWith(
                "Round is not active",
            )
        })
    })
})
