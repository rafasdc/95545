import { ObjectId } from "mongodb"

export interface Boat {
    _id?: ObjectId
    name: string
    operator: string
    status: "docked" | "outbound" | "inbound" | "maintenance"
}
