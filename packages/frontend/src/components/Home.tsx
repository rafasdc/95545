import Container from "react-bootstrap/Container"
import Overview from "./Overview"

const Home = () => (
    <Container fluid className="p-3">
        <Container fluid className="p-5 mb-4 bg-light rounded-3">
            <h1 className="header">EcoCatch Tours</h1>
            <p>Welcome to EcoCatch Tours, current boat conditions:</p>
            <Overview />
        </Container>
    </Container>
)

export default Home
