import * as express from "express"
import { ObjectId } from "mongodb"
import { getAllBoats } from "../controllers/boats.controller"
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
        req = { params: {} } as express.Request
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
})
