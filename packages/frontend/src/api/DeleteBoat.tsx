/**
 * Deletes a boat and updates the boat deletion state to trigger a render.
 *
 * @param {string} boatId - The ID of the boat to be deleted.
 * @param {boolean} boatDeleted - The current deletion status of the boat.
 * @param {Function} setBoatDeleted - A function to update the deletion status of the boat.
 *
 * @returns {void}
 */
const DeleteBoat = async (boatId: string, boatDeleted: boolean, setBoatDeleted: (value: boolean) => void) => {
    await fetch(`${import.meta.env.VITE_API_BASE_URL}/${boatId}`, {
        method: "Delete"
    })
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => {
            console.log(error)
            // setErrorMessage(error.message)
            // setShowModal(true)
        })
    setBoatDeleted(!boatDeleted)
}

export default DeleteBoat
