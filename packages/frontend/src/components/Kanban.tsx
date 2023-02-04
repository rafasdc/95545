import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Table from "react-bootstrap/Table"

const Kanban = () => (
    <Container fluid className="p-3">
        <Row className="pb-3">
            <Col>
                <Button>Add Boat</Button>
            </Col>
            <Col>
                <p>Boats unassigned: </p>
            </Col>
        </Row>
        <Row>
            <Table className="table-striped-columns" style={{ tableLayout: "fixed", width: "100%" }}>
                <thead>
                    <tr>
                        <th>Docked</th>
                        <th>Outbound to Sea</th>
                        <th>Inbound to Harbor</th>
                        <th>Maintenance</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider vh-100">
                    <tr>
                        <td id="docked">
                            <Row xs={1} md={1} className="g-4">
                                <Col>
                                    <Card>
                                        <Card.Body>Boat 1</Card.Body>
                                    </Card>
                                </Col>
                                <Col>
                                    <Card>
                                        <Card.Body>Boat 2</Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </td>
                        <td id="outbound"></td>
                        <td id="inbound"></td>
                        <td id="maintenance"></td>
                    </tr>
                </tbody>
            </Table>
        </Row>
    </Container>
)
export default Kanban
