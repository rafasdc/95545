/* eslint-disable react/prop-types */
import { Draggable } from "react-beautiful-dnd"
import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col"
import { DraggableCardProps } from "../interfaces/DraggableCardProps"

const handleVariant = (status) => {
    if (status === "docked") {
        return "secondary"
    }
    if (status === "outbound") {
        return "primary"
    }
    if (status === "inbound") {
        return "info"
    }
    return "warning"
}

const DraggableCard: React.FC<DraggableCardProps> = ({ id, index, boatName, operator, status }) => (
    <Col>
        <Draggable draggableId={id} index={index}>
            {(provided, snapshot) => (
                <Card
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                        opacity: snapshot.isDragging ? 0.5 : 1,
                        ...provided.draggableProps.style
                    }}
                    bg={handleVariant(status)}
                    text={status === "maintenance" ? "dark" : "white"}
                >
                    <Card.Header>{boatName}</Card.Header>
                    <Card.Body>
                        <Card.Text>Operator: {operator}</Card.Text>
                    </Card.Body>
                </Card>
            )}
        </Draggable>
    </Col>
)

export default DraggableCard
