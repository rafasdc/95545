/* eslint-disable jest/no-conditional-expect */
import { ObjectId } from "mongodb"
import { collections } from "../db/db"
import { createBoat, deleteBoat, getAllBoats, getBoat, updateBoat } from "../services/boats.service"

/*
    Note: MongoDB and collections are being mocked 
    for time due to peer dependency issues 
    when trying to include @shelf/jes-mongodb
*/

jest.mock("mongodb", () => ({
    ObjectId: jest.fn().mockImplementation(() => ({})),
    MongoDriverError: jest.fn()
}))

jest.mock("../db/db", () => ({
    collections: {
        boats: {
            find: jest.fn().mockReturnValue({
                toArray: jest.fn().mockResolvedValue([
                    {
                        _id: new ObjectId("63dde001dd33daca86d58fdb"),
                        name: "boat 1",
                        operator: "john",
                        status: "docked"
                    }
                ])
            }),
            findOne: jest.fn().mockResolvedValue({
                _id: new ObjectId("63dde001dd33daca86d58fdb"),
                operator: "john",
                status: "docked"
            }),
            insertOne: jest
                .fn()
                .mockResolvedValue({ acknowledged: true, insertedId: new ObjectId("63dde001dd33daca86d58fdb") }),
            updateOne: jest
                .fn()
                .mockResolvedValue({ acknowledged: true, matchedCount: 1, upsertCount: 0, upsertId: null }),
            deleteOne: jest.fn().mockResolvedValue({ acknowledged: true, deleteCount: 1 })
        }
    }
}))

describe("services tests", () => {
    describe("getAllBoats", () => {
        test("should return all boats", async () => {
            const result = await getAllBoats()
            expect(result).toEqual([
                { _id: new ObjectId("63dde001dd33daca86d58fdb"), name: "boat 1", operator: "john", status: "docked" }
            ])
        })

        test("should throw an error if something not Mongo related throws an error", async () => {
            ;(collections.boats?.find as jest.Mock).mockReturnValue({
                toArray: jest.fn().mockRejectedValue(new Error("Something not Mongo happened"))
            })
            try {
                await getAllBoats()
            } catch (error) {
                expect(error).toEqual(new Error("Unexpected error occurred"))
            }
        })
    })

    describe("getBoat", () => {
        test("should return a boat", async () => {
            const result = await getBoat("63dde001dd33daca86d58fdb")
            expect(result).toEqual({
                _id: new ObjectId("63dde001dd33daca86d58fdb"),
                operator: "john",
                status: "docked"
            })
        })

        test("should throw an error if something not Mongo related throws an error", async () => {
            ;(collections.boats?.findOne as jest.Mock).mockRejectedValue(new Error("Something not Mongo happened"))
            try {
                await getBoat("id")
            } catch (error) {
                expect(error).toEqual(new Error("Unexpected error occurred"))
            }
        })
    })

    describe("createBoat", () => {
        test("should create a boat", async () => {
            const result = await createBoat("boat1", "john")
            expect(result).toEqual({ acknowledged: true, insertedId: new ObjectId("63dde001dd33daca86d58fdb") })
        })

        test("should throw an error if something not Mongo related throws an error", async () => {
            ;(collections.boats?.insertOne as jest.Mock).mockRejectedValue(new Error("Something not Mongo happened"))
            try {
                await createBoat("boat1", "john")
            } catch (error) {
                expect(error).toEqual(new Error("Unexpected error occurred"))
            }
        })
    })

    describe("updateBoat", () => {
        test("should update a boat", async () => {
            const result = await updateBoat("boat 1", "63dde001dd33daca86d58fdb", "john", "docked")
            expect(result).toEqual({ acknowledged: true, matchedCount: 1, upsertCount: 0, upsertId: null })
        })
        test("should throw an error if something not Mongo related throws an error", async () => {
            ;(collections.boats?.updateOne as jest.Mock).mockRejectedValue(new Error("Something not Mongo happened"))
            try {
                await updateBoat("boat 1", "1", "john", "docked")
            } catch (error) {
                expect(error).toEqual(new Error("Unexpected error occurred"))
            }
        })
    })

    describe("deleteBoat", () => {
        test("should delete a boat", async () => {
            const result = await deleteBoat("63dde001dd33daca86d58fdb")
            expect(result).toEqual({ acknowledged: true, deleteCount: 1 })
        })
        test("should throw an error if something not Mongo related throws an error", async () => {
            ;(collections.boats?.updateOne as jest.Mock).mockRejectedValue(new Error("Something not Mongo happened"))
            try {
                await deleteBoat("1")
            } catch (error) {
                expect(error).toEqual(new Error("Unexpected error occurred"))
            }
        })
    })
})
