import Badge from "react-bootstrap/Badge"
import ListGroup from "react-bootstrap/ListGroup"

const Overview = ({ horizontal = false }: { horizontal: boolean | string }) => (
    <ListGroup as="ul" horizontal={horizontal}>
        <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
                <div className="fw-bold">Docked</div>
            </div>
            <Badge bg="secondary" pill>
                14
            </Badge>
        </ListGroup.Item>
        <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
                <div className="fw-bold">Outbound to Sea</div>
            </div>
            <Badge bg="info" pill>
                14
            </Badge>
        </ListGroup.Item>
        <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
                <div className="fw-bold">Inbound to Harbor</div>
            </div>
            <Badge bg="primary" pill>
                14
            </Badge>
        </ListGroup.Item>
        <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
                <div className="fw-bold">Maintenance</div>
            </div>
            <Badge bg="warning" pill>
                14
            </Badge>
        </ListGroup.Item>
    </ListGroup>
)

export default Overview
