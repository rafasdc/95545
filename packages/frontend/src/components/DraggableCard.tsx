/* eslint-disable react/prop-types */
import { Draggable } from "react-beautiful-dnd"
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
                    <Card.Header>{text}</Card.Header>
                    <Card.Body>
                        <Card.Text>Operator: </Card.Text>
                    </Card.Body>
                </Card>
            )}
        </Draggable>
    </Col>
)

export default DraggableCard
