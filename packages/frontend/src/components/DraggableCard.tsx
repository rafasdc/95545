/* eslint-disable react/prop-types */
import { Draggable } from "react-beautiful-dnd"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col"
import { DraggableCardProps } from "../interfaces/DraggableCardProps"

const DraggableCard: React.FC<DraggableCardProps> = ({ id, index, text }) => (
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
                >
                    <Card.Body>
                        <Card.Title>{text}</Card.Title>
                        <Button>Click Me</Button>
                    </Card.Body>
                </Card>
            )}
        </Draggable>
    </Col>
)

export default DraggableCard
