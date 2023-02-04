import * as express from "express"
import { ObjectId } from "mongodb"
import { createBoat, getAllBoats, getBoat } from "../controllers/boats.controller"
import { Boat } from "../interfaces/Boat.interface"
import * as boatService from "../services/boats.service"

jest.mock("../services/boats.service")

const res: any = {
    status: jest.fn(() => res),
    send: jest.fn()
}

describe("getAllBoats", () => {
    let req: express.Request

    beforeEach(() => {
        req = { params: {}, body: {} } as express.Request
        res.status.mockClear()
        res.send.mockClear()
    })

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
    // getBoat Tests
    test("getBoat should return 200 and the boat with id 1", async () => {
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
    // createBoat tests
    test("createBoat should return 400 if operator is missing", async () => {
        await createBoat(req, res)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.send).toHaveBeenCalledWith("Bad request")
    })

    test("createBoat should return 201 and the inserted id on success", async () => {
        req.body.operator = "John Doe"
        ;(boatService.createBoat as jest.Mock).mockResolvedValue({ insertedId: "1" })

        await createBoat(req, res)

        expect(res.status).toHaveBeenCalledWith(201)
        expect(res.send).toHaveBeenCalledWith("1")
    })

    test("createBoat should return 500 on server error", async () => {
        req.body.operator = "John Doe"
        ;(boatService.createBoat as jest.Mock).mockRejectedValue(new Error("Server error"))

        await createBoat(req, res)

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.send).toHaveBeenCalledWith("Internal Server Error")
    })
})
