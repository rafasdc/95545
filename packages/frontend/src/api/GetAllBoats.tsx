import { Boat, BoatState } from "../interfaces/BoatState"

// helper function to separate boats based on status
// each object is array of boats on a specific status
const group = (arr: any[]) => ({
    docked: arr.filter((boat: Boat) => boat.status === "docked"),
    outbound: arr.filter((boat: Boat) => boat.status === "outbound"),
    inbound: arr.filter((boat: Boat) => boat.status === "inbound"),
    maintenance: arr.filter((boat: Boat) => boat.status === "maintenance")
})

// Function that gets all boats and sets them as state
const GetAllBoats = (setBoats: (value: BoatState) => void) => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/`)
        .then((response) => response.json())
        .then((data) => {
            const currBoats = group(data)
            setBoats(currBoats)
        })
}

export default GetAllBoats
