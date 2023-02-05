import { MongoDriverError, ObjectId } from "mongodb"
import { collections } from "../db/db"
import { Boat } from "../interfaces/Boat.interface"

export const getAllBoats = async () => {
    try {
        const boats = await collections.boats?.find<Boat>({}).toArray()
        return boats
    } catch (error: unknown) {
        if (error instanceof MongoDriverError) {
            throw new Error(error.message)
        }
        throw new Error("Unexpected error occurred")
    }
}

export const getBoat = async (id: string) => {
    try {
        const query = { _id: new ObjectId(id) }
        const boat = await collections.boats?.findOne<Boat>(query)
        return boat
    } catch (error: unknown) {
        if (error instanceof MongoDriverError) {
            throw new Error(error.message)
        }
        throw new Error("Unexpected error occurred")
    }
}

export const createBoat = async (name: string, operator: string) => {
    try {
        const newBoat: Boat = {
            name,
            operator,
            status: "docked"
        }
        const result = await collections.boats?.insertOne(newBoat)
        return result
    } catch (error: unknown) {
        if (error instanceof MongoDriverError) {
            throw new Error(error.message)
        }
        throw new Error("Unexpected error occurred")
    }
}

export const updateBoat = async (name: string, id: string, operator: string, status: Boat["status"]) => {
    try {
        const update: Boat = {
            name,
            operator,
            status
        }
        const query = { _id: new ObjectId(id) }
        const result = await collections.boats?.updateOne(query, { $set: update })
        return result
    } catch (error: unknown) {
        if (error instanceof MongoDriverError) {
            throw new Error(error.message)
        }
        throw new Error("Unexpected error occurred")
    }
}

export const deleteBoat = async (id: string) => {
    try {
        const query = { _id: new ObjectId(id) }
        const result = await collections.boats?.deleteOne(query)
        return result
    } catch (error: unknown) {
        if (error instanceof MongoDriverError) {
            throw new Error(error.message)
        }
        throw new Error("Unexpected error occurred")
    }
}
