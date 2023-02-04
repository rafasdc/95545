import * as express from "express"
import * as boatService from "../services/boats.service"

export const getAllBoats = async (req: express.Request, res: express.Response) => {
    try {
        const boats = await boatService.getAllBoats()
        res.status(200).send(boats)
    } catch (error: unknown) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
}

export const getBoat = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params
        const boat = await boatService.getBoat(id)
        console.log(boat)
        if (boat) {
            res.status(200).send(boat)
        } else {
            res.status(404).send("Boat not found")
        }
    } catch (error: unknown) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
}

export const createBoat = async (req: express.Request, res: express.Response) => {
    try {
        const { operator } = req.body
        const createResult = await boatService.createBoat(operator)
        res.status(201).send(createResult?.insertedId)
    } catch (error: unknown) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
}

export const updateBoat = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params
        const { operator, status } = req.body
        if (!operator && !status) {
            return res.status(400).send("Bad request")
        }
        const updateResult = await boatService.updateBoat(id, operator, status)
        console.log(updateResult)
        if (updateResult) {
            if (updateResult.modifiedCount !== 0) {
                return res.status(200).send(id)
            }
        }
        res.status(304).send("Not modified")
    } catch (error: unknown) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
}

export const deleteBoat = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params
        const deleteResult = await boatService.deleteBoat(id)
        if (deleteResult && deleteResult.deletedCount) {
            res.status(202).send(id)
        } else if (!deleteResult) {
            res.status(400).send("Bad Request")
        } else if (!deleteResult.deletedCount) {
            res.status(404).send("ID does not exist")
        }
    } catch (error: unknown) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
}
