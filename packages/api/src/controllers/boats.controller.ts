import * as express from "express"
import * as boatService from "../services/boats.service"

/**
 * This function retrieves all the boats stored in the database.
 *
 * @param {express.Request} req - The request object, not used in this function.
 * @param {express.Response} res - The response object to send the result of the retrieval operation.
 *
 * @throws {500} - If there is an error during the retrieval operation, the error will be logged and a "Internal Server Error" message will be sent in the response.
 *
 * @returns {void} - No return value, the result of the retrieval operation is sent in the response.
 */
export const getAllBoats = async (req: express.Request, res: express.Response) => {
    try {
        const boats = await boatService.getAllBoats()
        return res.status(200).send(boats)
    } catch (error: unknown) {
        console.log(error)
        return res.status(500).send("Internal Server Error")
    }
}

/**
 * This function retrieves a single boat from the database by its id.
 *
 * @param {express.Request} req - The request object containing the boat id in the parameters.
 * @param {express.Response} res - The response object to send the result of the retrieval operation.
 *
 * @throws {404} - If the boat with the given id is not found in the database, a "Boat not found" message will be sent in the response.
 * @throws {500} - If there is an error during the retrieval operation, the error will be logged and a "Internal Server Error" message will be sent in the response.
 *
 * @returns {void} - No return value, the result of the retrieval operation is sent in the response.
 */
export const getBoat = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params
        const boat = await boatService.getBoat(id)
        if (boat) {
            return res.status(200).send(boat)
        }
        return res.status(404).send("Boat not found")
    } catch (error: unknown) {
        console.log(error)
        return res.status(500).send("Internal Server Error")
    }
}

/**
 * This function creates a new boat and sends the inserted ID in the response.
 *
 * @param {express.Request} req - The request object containing the operator for the new boat.
 * @param {express.Response} res - The response object to send the result of the creation operation.
 *
 * @throws {400} - If the operator is missing in the request body, a "Bad request" message will be sent in the response.
 * @throws {500} - If there is an error during the creation operation, the error will be logged and a "Internal Server Error" message will be sent in the response.
 *
 * @returns {void} - No return value, the result of the creation operation is sent in the response.
 */
export const createBoat = async (req: express.Request, res: express.Response) => {
    try {
        const { operator } = req.body
        if (!operator) {
            return res.status(400).send("Bad request")
        }
        const createResult = await boatService.createBoat(operator)
        return res.status(201).send(createResult?.insertedId)
    } catch (error: unknown) {
        console.log(error)
        return res.status(500).send("Internal Server Error")
    }
}

/**
 * Updates a boat's information based on the id provided in the request.
 *
 * @param {express.Request} req - The incoming request object
 * @param {express.Response} res - The response object to send the result
 *
 * @throws {400} If neither operator nor status is provided in the request body
 * @throws {500} If an error occurs during the update operation
 *
 * @returns {void} Sends the result of the update operation in the response object.
 */
export const updateBoat = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params
        const { operator, status } = req.body
        if (!operator && !status) {
            return res.status(400).send("Bad request")
        }
        const updateResult = await boatService.updateBoat(id, operator, status)
        if (updateResult) {
            if (updateResult.modifiedCount !== 0) {
                return res.status(200).send(id)
            }
        }
        return res.status(304).send("Not modified")
    } catch (error: unknown) {
        console.log(error)
        return res.status(500).send("Internal Server Error")
    }
}

/**
 * Deletes a boat based on the id provided in the request.
 *
 * @param {express.Request} req - The incoming request object
 * @param {express.Response} res - The response object to send the result
 *
 * @throws {400} - If the boat failed to delete, a "Bad Request" message will be sent in the response
 * @throws {404} - If the boat with the given id is not found in the database, a "Boat not found" message will be sent in the response.
 * @throws {500} - If there is an error during the creation operation, the error will be logged and a "Internal Server Error" message will be sent in the response.
 *
 * @returns {void} Sends the result of the deletion operation in the response object.
 */
export const deleteBoat = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params
        const deleteResult = await boatService.deleteBoat(id)
        if (deleteResult && deleteResult.deletedCount) {
            return res.status(202).send(id)
        }
        if (deleteResult && !deleteResult.deletedCount) {
            return res.status(404).send("ID does not exist")
        }
        return res.status(400).send("Bad Request")
    } catch (error: unknown) {
        console.log(error)
        return res.status(500).send("Internal Server Error")
    }
}
