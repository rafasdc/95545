import { useEffect, useState } from "react"
import Container from "react-bootstrap/Container"
import GetAllBoats from "../api/GetAllBoats"
import { BoatState } from "../interfaces/BoatState"
import Overview from "./Overview"

const Home = () => {
    const [boats, setBoats] = useState<BoatState>({
        docked: [],
        outbound: [],
        inbound: [],
        maintenance: []
    })
    useEffect(() => {
        GetAllBoats(setBoats)
    }, [])
    return (
        <Container fluid className="p-3">
            <Container fluid className="p-5 mb-4 bg-light rounded-3">
                <h1 className="header">EcoCatch Tours</h1>
                <p>Welcome to EcoCatch Tours, current boat conditions:</p>
                <Overview horizontal={false} boats={boats} />
            </Container>
        </Container>
    )
}

export default Home
