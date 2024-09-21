import express from 'express';
import { ethers } from 'ethers';
import { MongoClient } from "mongodb"
import dotenv from "dotenv"
import cors from 'cors';

dotenv.config()

import contract from "./contracts/onlygrants.json"

const app = express();
const port = 3001;

// Add middleware
app.use(cors());
app.use(express.json());

const RPC_URL = "https://api.helium.fhenix.zone";
const chainId = 8008135;

// Initialize your Ethereum provider (e.g., Infura)
const provider = new ethers.JsonRpcProvider(RPC_URL);
const client = new MongoClient(process.env.MONGO_URI as string);
const db = client.db('onlygrants')

// Connect to the contract
const onlygrantsContract = new ethers.Contract(contract.address, contract.abi, provider);

// Start listening to the event
onlygrantsContract.on('*', async (event) => {
    console.log('Event emitted:');
    console.log(event); // Log the event data
    await db.collection('onlygrants').insertOne({ ...event, chainId: chainId })
});

// Add health route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

app.get('/rounds', async (req, res) => {
    const rounds = await db.collection('onlygrants').find({
        "fragment.name": "RoundCreated"
    }).toArray();



    res.status(200).json(rounds.map(
        (round) => {
            return {
                id: round.args[0],
                owner: round.args[1],
                matchingPool: round.args[2],
            }
        }

    ));
});


// Start the Express.js server

app.listen(port, () => {
    client.connect().then(() => {
        console.log("Connected successfully to server");
    });
    console.log(`Express server listening on port ${port}`);
});