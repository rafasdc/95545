import * as mongoDB from "mongodb"
import { MongoClient } from "mongodb"

// Connection URL
const url = process.env.DB_CONNECTION_STRING || ""
const client = new MongoClient(url)

// Database Name
const dbName = process.env.DB_NAME || ""
const collectionName = process.env.COLLECTION_NAME || ""

export const collections: { boats?: mongoDB.Collection } = {}

export async function connectToDb() {
    try {
        await client.connect()
        const db = client.db(dbName)
        const boatsCollection = db.collection(collectionName)
        collections.boats = boatsCollection
    } catch (error: unknown) {
        console.log("Error while connecting to the DB")
    }
}
