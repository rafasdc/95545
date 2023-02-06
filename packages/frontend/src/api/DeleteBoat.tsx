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
