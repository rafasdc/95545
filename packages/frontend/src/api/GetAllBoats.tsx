import { Boat, BoatState } from "../interfaces/BoatState"

/**
 * Groups an array of boats based on their status.
 *
 * @param {Array} arr - An array of boats.
 *
 * @returns {Object} An object containing arrays of boats grouped by their status.
 */
const group = (arr: any[]) => ({
    docked: arr.filter((boat: Boat) => boat.status === "docked"),
    outbound: arr.filter((boat: Boat) => boat.status === "outbound"),
    inbound: arr.filter((boat: Boat) => boat.status === "inbound"),
    maintenance: arr.filter((boat: Boat) => boat.status === "maintenance")
})

/**
 * Fetches all boats and sets the boats state.
 *
 * @param {Function} setBoats - A function to set the state of all boats.
 *
 * @returns {void}
 */
const GetAllBoats = (setBoats: (value: BoatState) => void) => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/`)
        .then((response) => response.json())
        .then((data) => {
            const currBoats = group(data)
            setBoats(currBoats)
        })
}

export default GetAllBoats
