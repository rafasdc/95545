import * as express from "express"
import { ObjectId } from "mongodb"
import { createBoat, deleteBoat, getAllBoats, getBoat, updateBoat } from "../controllers/boats.controller"
import { Boat } from "../interfaces/Boat.interface"
import * as boatService from "../services/boats.service"

jest.mock("../services/boats.service")

const res: any = {
    status: jest.fn(() => res),
    send: jest.fn()
}

describe("controller tests", () => {
    let req: express.Request

    beforeEach(() => {
        req = { params: {}, body: {} } as express.Request
        res.status.mockClear()
        res.send.mockClear()
    })
    // getAllBoats Tests
    describe("getAllBoats", () => {
        test("getAllBoats should return 200 and all boats", async () => {
            const boats: Boat[] = [
                { _id: new ObjectId(), operator: "john", status: "docked" },
                { _id: new ObjectId(), operator: "bob", status: "docked" }
            ]
            ;(boatService.getAllBoats as jest.Mock).mockResolvedValue(boats)

            await getAllBoats(req, res)

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.send).toHaveBeenCalledWith(boats)
        })

        test("getAllBoats should return 500 on server error", async () => {
            ;(boatService.getAllBoats as jest.Mock).mockRejectedValue(new Error("Server error"))

            await getAllBoats(req, res)

            expect(res.status).toHaveBeenCalledWith(500)
            expect(res.send).toHaveBeenCalledWith("Internal Server Error")
        })
    })
    // end getAllBoat Tests
    // getBoat Tests
    describe("getBoat", () => {
        test("getBoat should return 200 and the boat with id 63dde001dd33daca86d58fdb", async () => {
            req.params.id = "63dde001dd33daca86d58fdb"
            const boat: Boat = { _id: new ObjectId(req.params.id), operator: "john", status: "docked" }
            ;(boatService.getBoat as jest.Mock).mockResolvedValue(boat)

            await getBoat(req, res)

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.send).toHaveBeenCalledWith(boat)
        })

        test("getBoat should return 404 if the boat is not found", async () => {
            req.params.id = "1"
            ;(boatService.getBoat as jest.Mock).mockResolvedValue(undefined)

            await getBoat(req, res)

            expect(res.status).toHaveBeenCalledWith(404)
            expect(res.send).toHaveBeenCalledWith("Boat not found")
        })
        test("getBoat should return 500 on server error", async () => {
            req.params.id = "1"
            ;(boatService.getBoat as jest.Mock).mockRejectedValue(new Error("Server error"))

            await getBoat(req, res)

            expect(res.status).toHaveBeenCalledWith(500)
            expect(res.send).toHaveBeenCalledWith("Internal Server Error")
        })
    })
    // end getBoat Tests
    // createBoat Tests
    describe("createBoat", () => {
        test("createBoat should return 400 if operator is missing", async () => {
            await createBoat(req, res)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.send).toHaveBeenCalledWith("Bad request")
        })

        test("createBoat should return 201 and the inserted id on success", async () => {
            req.body.operator = "john"
            ;(boatService.createBoat as jest.Mock).mockResolvedValue({ insertedId: "1" })

            await createBoat(req, res)

            expect(res.status).toHaveBeenCalledWith(201)
            expect(res.send).toHaveBeenCalledWith("1")
        })

        test("createBoat should return 500 on server error", async () => {
            req.body.operator = "john"
            ;(boatService.createBoat as jest.Mock).mockRejectedValue(new Error("Server error"))

            await createBoat(req, res)

            expect(res.status).toHaveBeenCalledWith(500)
            expect(res.send).toHaveBeenCalledWith("Internal Server Error")
        })
    })
    // end createBoat Tests
    // updateBoat Tests
    describe("updateBoat", () => {
        test("returns 400 if operator or status is missing", async () => {
            await updateBoat(req, res)
            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.send).toHaveBeenCalledWith("Bad request")

            req.body = { operator: "john" }
            await updateBoat(req, res)
            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.send).toHaveBeenCalledWith("Bad request")
        })

        test("returns 200 if boat is updated successfully", async () => {
            req.params.id = "63dde001dd33daca86d58fdb"
            ;(boatService.updateBoat as jest.Mock).mockResolvedValue({ modifiedCount: 1 })
            req.body = { operator: "john", status: "docked" }

            await updateBoat(req, res)
            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.send).toHaveBeenCalledWith("63dde001dd33daca86d58fdb")
        })
        test("returns 304 if boat is not modified", async () => {
            req.params.id = "63def4c855633981de90826e"
            ;(boatService.updateBoat as jest.Mock).mockResolvedValue({ modifiedCount: 0 })
            req.body = { operator: "john", status: "docked" }

            await updateBoat(req, res)
            expect(res.status).toHaveBeenCalledWith(304)
            expect(res.send).toHaveBeenCalledWith("Not modified")
        })

        test("returns 500 on error", async () => {
            ;(boatService.updateBoat as jest.Mock).mockRejectedValue(new Error("Database error"))
            req.body = { operator: "john", status: "docked" }

            await updateBoat(req, res)
            expect(res.status).toHaveBeenCalledWith(500)
            expect(res.send).toHaveBeenCalledWith("Internal Server Error")
        })
    })
    // end updateBoat tests
    // deleteBoat tests
    describe("deleteBoat", () => {
        test("should return status 202 with id when deleteResult.deletedCount is truthy", async () => {
            req.params.id = "63dde001dd33daca86d58fdb"
            ;(boatService.deleteBoat as jest.Mock).mockResolvedValue({ deletedCount: 1 })

            await deleteBoat(req, res)

            expect(res.status).toHaveBeenCalledWith(202)
            expect(res.send).toHaveBeenCalledWith("63dde001dd33daca86d58fdb")
        })

        test("should return status 404 when deleteResult.deletedCount is falsy", async () => {
            req.params.id = "63def4c855633981de90826e"
            ;(boatService.deleteBoat as jest.Mock).mockResolvedValue({ deletedCount: 0 })

            await deleteBoat(req, res)

            expect(res.status).toHaveBeenCalledWith(404)
            expect(res.send).toHaveBeenCalledWith("ID does not exist")
        })

        test("should return status 400 when deleteResult is falsy", async () => {
            req.params.id = "1"
            ;(boatService.deleteBoat as jest.Mock).mockResolvedValue(null)

            await deleteBoat(req, res)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.send).toHaveBeenCalledWith("Bad Request")
        })

        test("should return status 500 when there is an error", async () => {
            ;(boatService.deleteBoat as jest.Mock).mockRejectedValue(new Error())

            await deleteBoat(req, res)

            expect(res.status).toHaveBeenCalledWith(500)
            expect(res.send).toHaveBeenCalledWith("Internal Server Error")
        })
    })
    // end deleteBoat Tests
})
