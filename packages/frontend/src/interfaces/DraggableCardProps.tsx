export interface DraggableCardProps {
    id: string
    index: number
    boatName: string
    operator: string
    status: string
    boatDeleted: boolean
    setBoatDeleted: (value: boolean) => void
}
