import express from 'express';
import { ethers } from 'ethers';
import { MongoClient } from "mongodb"
import dotenv from "dotenv"
dotenv.config()

import contract from "./contracts/onlygrants.json"

const app = express();
const port = 3001;

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


// Start the Express.js server
app.listen(port, () => {
    client.connect().then(() => {
        console.log("Connected successfully to server");
    });
    console.log(`Express server listening on port ${port}`);
});