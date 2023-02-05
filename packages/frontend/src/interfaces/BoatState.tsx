export interface BoatState {
    docked: Boat[]
    outbound: Boat[]
    inbound: Boat[]
    maintenance: Boat[]
}

export interface Boat {
    name: string
    id: string
    status: string
    operator: string
}
