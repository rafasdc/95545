/* eslint-disable react/prop-types */
import React, { useState } from "react"
import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Modal from "react-bootstrap/Modal"
import Row from "react-bootstrap/Row"
import { BoatState } from "../interfaces/BoatState"

const CreateBoatModal = ({
    showModal,
    setShowModal,
    boats,
    setBoats
}: {
    showModal: boolean
    setShowModal: (value: boolean) => void
    boats: BoatState
    setBoats: (value: BoatState) => void
}) => {
    const [formsState, setFormState] = useState({
        name: "",
        operator: ""
    })

    const handleChange = (event: React.ChangeEvent<any>) => {
        setFormState({
            ...formsState,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event: React.ChangeEvent<any>) => {
        event.preventDefault()
        // Perform API call to createBoat
        console.log("Form data:", formsState)
        const updatedState = await fetch(`${import.meta.env.VITE_API_BASE_URL}/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formsState)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                const newBoatsState = boats
                console.log(newBoatsState)
                const newDocked = boats.docked
                newDocked.push({
                    name: formsState.name,
                    _id: data,
                    status: "docked",
                    operator: formsState.operator
                })
                newBoatsState.docked = newDocked
                return newBoatsState
            })
        setBoats(updatedState)
        setFormState({ name: "", operator: "" })
        setShowModal(false)
    }

    return (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Form in Modal</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Form.Group as={Col} controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter boat name"
                                name="name"
                                value={formsState.name}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formOperator">
                            <Form.Label>Operator</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter boat operator"
                                name="operator"
                                value={formsState.operator}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                    Cancel
                </Button>
                <Button
                    variant="primary"
                    disabled={formsState.name.length < 3 || formsState.operator.length < 3}
                    onClick={handleSubmit}
                >
                    Create Boat
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateBoatModal
