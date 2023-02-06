import { BoatState } from "./BoatState"

export interface CreateBoatModalProps {
    showModal: boolean
    setShowModal: (value: boolean) => void
    boats: BoatState
    setBoats: (value: BoatState) => void
}
