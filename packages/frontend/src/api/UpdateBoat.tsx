import { BoatState } from "../interfaces/BoatState"

/**
 *  Update a boat's information.
 *
 * @param {string} boatId - The ID of the boat to update.
 * @param {Object} updateObject - An object containing the updated state with the boat in the new status.
 * @param {string} statusObject - The status the boat is going to be updated to.
 * @param {number} index - The index of the boat in the updated array of boats with the updated status.
 *
 * @returns {void}
 */
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
