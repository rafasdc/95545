import { ObjectId } from "mongodb"

export interface Boat {
    _id?: ObjectId
    operator: string
    status: "docked" | "outbound" | "inbound" | "maintenance"
}
