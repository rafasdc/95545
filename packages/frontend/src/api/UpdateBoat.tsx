import { BoatState } from "../interfaces/BoatState"

const UpdateBoat = (boatId: string, updateObject: BoatState, statusObject: string, index: number) => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/${boatId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updateObject[statusObject as keyof BoatState][index])
    })
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => {
            console.log(error)
            // setErrorMessage(error.message)
            // setShowModal(true)
        })
}

export default UpdateBoat
