// import React, { useEffect, useState } from "react";
// import { IDKitWidget, VerificationLevel } from "@worldcoin/idkit";

// export default function WorldCoinConnect() {
//   const [worldcoinVerified, setWorldcoinVerified] = useState(false);
//   const [worldcoinId, setWorldcoinId] = useState<any>(null);

//   useEffect(() => {
//     const signature = localStorage.getItem("worldcoinSignature");
//     if (signature) {
//       setWorldcoinVerified(true);
//       const worldcoinSignature = JSON.parse(signature);
//       setWorldcoinId({
//         nullifier_hash: worldcoinSignature.message,
//       });
//       console.log("Loaded worldcoin");
//     }
//   }, []);

//   const handleVerify = async (proof: any) => {
//     // console.log(proof);
//     const response = await fetch("/api/verify", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ proof }),
//     });
//     if (!response.ok) {
//       throw new Error(`Error verifying Worldcoin: ${response.statusText}`);
//     }

//     const data = await response.json();
//     setWorldcoinVerified(data.verified);
//   };

//   const handleSign = async (message: string) => {
//     const response = await fetch("/api/sign", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ message }),
//     });
//     if (!response.ok) {
//       throw new Error(`Error signing Worldcoin: ${response.statusText}`);
//     }

//     const signedMessage = await response.json();

//     // Store the signed message in the localStorage
//     localStorage.setItem(
//       "worldcoinSignature",
//       JSON.stringify({
//         message,
//         signature: signedMessage,
//       })
//     );

//     const onSuccess = async (proof: any) => {
//       // Sign the verified nullifier hash and store in the localStorage
//       await handleSign(proof.nullifier_hash);

//       setWorldcoinId(proof);
//     };

//     return (
//       <>
//         {!worldcoinId ? (
//           <IDKitWidget
//             app_id="app_e2e1326a0f8ee7f7af2a27451fd9175d" // obtained from the Developer Portal
//             action="verify-human" // this is your action id from the Developer Portal
//             onSuccess={onSuccess} // callback when the modal is closed
//             handleVerify={handleVerify} // optional callback when the proof is received
//             verification_level={VerificationLevel.Device}
//           >
//             {({ open }) => (
//               <div
//                 className="font-bold text-lg pt-1 text-zinc-600 cursor-pointer"
//                 onClick={open}
//               >
//                 World ID Login
//               </div>
//             )}
//           </IDKitWidget>
//         ) : (
//           <div className="text-right mt-1 mr-1">
//             <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
//               Worldcoin ✅{" "}
//             </span>
//           </div>
//         )}
//       </>
//     );
//   };
// }

import React, { useEffect, useState } from "react";
import { IDKitWidget, VerificationLevel } from "@worldcoin/idkit";

export default function WorldCoinConnect() {
  const [worldcoinVerified, setWorldcoinVerified] = useState(false);
  const [worldcoinId, setWorldcoinId] = useState<any>(null);

  useEffect(() => {
    const signature = localStorage.getItem("worldcoinSignature");
    if (signature) {
      setWorldcoinVerified(true);
      const worldcoinSignature = JSON.parse(signature);
      setWorldcoinId({
        nullifier_hash: worldcoinSignature.message,
      });
      console.log("Loaded worldcoin");
    }
  }, []);

  const handleVerify = async (proof: any) => {
    const response = await fetch("/api/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ proof }),
    });
    if (!response.ok) {
      throw new Error(`Error verifying Worldcoin: ${response.statusText}`);
    }

    const data = await response.json();
    setWorldcoinVerified(data.verified);
  };

  const handleSign = async (message: string) => {
    // const response = await fetch("/api/sign", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ message }),
    // });
    // if (!response.ok) {
    //   throw new Error(`Error signing Worldcoin: ${response.statusText}`);
    // }

    // const signedMessage = await response.json();

    // // Store the signed message in the localStorage
    // localStorage.setItem(
    //   "worldcoinSignature",
    //   JSON.stringify({
    //     message,
    //     signature: signedMessage,
    //   })
    // );
    console.log("first");
  };

  const onSuccess = async (proof: any) => {
    // Sign the verified nullifier hash and store in the localStorage
    await handleSign(proof.nullifier_hash);
    setWorldcoinId(proof);
  };

  return (
    <>
      {!worldcoinId ? (
        <IDKitWidget
          app_id="app_e2e1326a0f8ee7f7af2a27451fd9175d" // obtained from the Developer Portal
          action="verify-human" // this is your action id from the Developer Portal
          onSuccess={onSuccess} // callback when the modal is closed
          handleVerify={handleVerify} // optional callback when the proof is received
          verification_level={VerificationLevel.Device}
        >
          {({ open }) => (
            <div
              className="font-bold text-lg pt-1 text-zinc-600 cursor-pointer"
              onClick={open}
            >
              World ID Login
            </div>
          )}
        </IDKitWidget>
      ) : (
        <div className="text-right mt-1 mr-1">
          <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
            Worldcoin ✅{" "}
          </span>
        </div>
      )}
    </>
  );
}
