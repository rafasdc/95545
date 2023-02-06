import { BoatState } from "../interfaces/BoatState"

/**
 * Creates a new boat and updates the current boats state.
 *
 * @param {Object} boat - The boat to be created.
 * @param {Object} boat.name - The name of the boat.
 * @param {Object} boat.operator - The operator of the boat.
 * @param {Object} currentBoats - The current state of boats.
 *
 * @returns {Object} The updated boats state with the newly created boat.
 */
const CreateBoat = async (boat: { name: string; operator: string }, currentBoats: BoatState) => {
    const newBoats = await fetch(`${import.meta.env.VITE_API_BASE_URL}/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(boat)
    })
        .then((response) => response.json())
        .then((data) => {
            const newBoatsState = currentBoats
            const newDocked = currentBoats.docked
            newDocked.push({
                name: boat.name,
                _id: data,
                status: "docked",
                operator: boat.operator
            })
            newBoatsState.docked = newDocked
            return newBoatsState
        })
    return newBoats
}

export default CreateBoat
