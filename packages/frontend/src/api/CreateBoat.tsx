import { BoatState } from "../interfaces/BoatState"

// Creates a new boat and returns a new object
// that can be used to set state with the new boat inserted
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
