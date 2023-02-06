/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from "react"
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd"
import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Table from "react-bootstrap/Table"
import GetAllBoats from "../api/GetAllBoats"
import UpdateBoat from "../api/UpdateBoat"
import { Boat, BoatState } from "../interfaces/BoatState"
import CreateBoatModal from "./CreateBoatModal"
import DraggableCard from "./DraggableCard"

const move = (source: Boat[], destination: Boat[], droppableSource: any, droppableDestination: any) => {
    console.log(source)
    console.log(destination)
    const sourceClone = Array.from(source)
    const destClone = Array.from(destination)
    // remove item from source and update the status to destination
    const [removed] = sourceClone.splice(droppableSource.index, 1)
    removed.status = droppableDestination.droppableId

    // insert item into destination
    destClone.splice(droppableDestination.index, 0, removed)

    // return modified source and destination arrays
    const result = {
        [droppableSource.droppableId]: sourceClone,
        [droppableDestination.droppableId]: destClone
    } as Pick<BoatState, keyof BoatState>

    return result
}

const Kanban = () => {
    const [showAddBoatModal, setAddBoatModal] = useState(false)
    const [boatDeleted, setBoatDeleted] = useState(false)
    const [boats, setBoats] = useState<BoatState>({
        docked: [],
        outbound: [],
        inbound: [],
        maintenance: []
    })

    useEffect(() => {
        GetAllBoats(setBoats)
    }, [])

    useEffect(() => {
        GetAllBoats(setBoats)
    }, [boatDeleted])

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result
        console.log(result)

        // no target
        if (!destination) {
            return
        }

        // reorder if same entry
        if (source.droppableId === destination.droppableId) {
            // TODO: reorder, not implemented
            // item has changed list
        } else {
            const newList = move(
                boats[source.droppableId as keyof BoatState],
                boats[destination.droppableId as keyof BoatState],
                source,
                destination
            )
            console.log(newList)
            const newBoatsState = boats
            console.log(newBoatsState)
            newBoatsState[source.droppableId as keyof BoatState] = newList[source.droppableId as keyof BoatState]
            newBoatsState[destination.droppableId as keyof BoatState] =
                newList[destination.droppableId as keyof BoatState]
            console.log(newBoatsState)
            setBoats(newBoatsState)
            // update DB
            UpdateBoat(result.draggableId, newBoatsState, destination.droppableId, destination.index)
        }
    }

    return (
        <>
            <CreateBoatModal
                showModal={showAddBoatModal}
                setShowModal={setAddBoatModal}
                boats={boats}
                setBoats={setBoats}
            />
            <DragDropContext onDragEnd={onDragEnd}>
                <Container fluid className="p-3">
                    <Row className="pb-3">
                        <Col>
                            <Button onClick={() => setAddBoatModal(true)}>Add Boat</Button>
                        </Col>
                        <Col>Something here</Col>
                    </Row>
                    <Row>
                        <Table className="table-striped-columns" style={{ tableLayout: "fixed", width: "100%" }}>
                            <thead>
                                <tr>
                                    <th>Docked</th>
                                    <th>Outbound</th>
                                    <th>Inbound</th>
                                    <th>Maintenance</th>
                                </tr>
                            </thead>
                            <tbody className="table-group-divider vh-100">
                                <tr>
                                    <Droppable droppableId="docked">
                                        {(provided) => (
                                            <td id="docked" ref={provided.innerRef} {...provided.droppableProps}>
                                                <Row xs={1} md={1} className="g-4">
                                                    {boats.docked.map((boat, index) => (
                                                        <DraggableCard
                                                            id={boat._id}
                                                            index={index}
                                                            boatName={boat.name}
                                                            operator={boat.operator}
                                                            status={boat.status}
                                                            key={boat._id}
                                                            boatDeleted={boatDeleted}
                                                            setBoatDeleted={setBoatDeleted}
                                                        />
                                                    ))}
                                                    {provided.placeholder}
                                                </Row>
                                            </td>
                                        )}
                                    </Droppable>
                                    <Droppable droppableId="outbound">
                                        {(provided) => (
                                            <td id="outbound" ref={provided.innerRef} {...provided.droppableProps}>
                                                <Row xs={1} md={1} className="g-4">
                                                    {boats.outbound.map((boat, index) => (
                                                        <DraggableCard
                                                            id={boat._id}
                                                            index={index}
                                                            boatName={boat.name}
                                                            operator={boat.operator}
                                                            status={boat.status}
                                                            key={boat._id}
                                                            boatDeleted={boatDeleted}
                                                            setBoatDeleted={setBoatDeleted}
                                                        />
                                                    ))}
                                                    {provided.placeholder}
                                                </Row>
                                            </td>
                                        )}
                                    </Droppable>
                                    <Droppable droppableId="inbound">
                                        {(provided) => (
                                            <td id="inbound" ref={provided.innerRef} {...provided.droppableProps}>
                                                <Row xs={1} md={1} className="g-4">
                                                    {boats.inbound.map((boat, index) => (
                                                        <DraggableCard
                                                            id={boat._id}
                                                            index={index}
                                                            boatName={boat.name}
                                                            operator={boat.operator}
                                                            status={boat.status}
                                                            key={boat._id}
                                                            boatDeleted={boatDeleted}
                                                            setBoatDeleted={setBoatDeleted}
                                                        />
                                                    ))}
                                                    {provided.placeholder}
                                                </Row>
                                            </td>
                                        )}
                                    </Droppable>
                                    <Droppable droppableId="maintenance">
                                        {(provided) => (
                                            <td id="maintenance" ref={provided.innerRef} {...provided.droppableProps}>
                                                <Row xs={1} md={1} className="g-4">
                                                    {boats.maintenance.map((boat, index) => (
                                                        <DraggableCard
                                                            id={boat._id}
                                                            index={index}
                                                            boatName={boat.name}
                                                            operator={boat.operator}
                                                            status={boat.status}
                                                            key={boat._id}
                                                            boatDeleted={boatDeleted}
                                                            setBoatDeleted={setBoatDeleted}
                                                        />
                                                    ))}
                                                    {provided.placeholder}
                                                </Row>
                                            </td>
                                        )}
                                    </Droppable>
                                </tr>
                            </tbody>
                        </Table>
                    </Row>
                </Container>
            </DragDropContext>
        </>
    )
}
export default Kanban
