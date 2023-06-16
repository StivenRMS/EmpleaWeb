import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from "reactstrap";

const TokenModal = ({ isOpen, tokenApi, emailA}) => {
    const [token, setToken] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("TokenApi: ",tokenApi);
        if (token == tokenApi) {
            window.location.href = `/NewPassword?emailA=${emailA}`
        } else {
            alert("Token Invalido");
        }
        
    };

    return (
        <Modal isOpen={isOpen} >
            <ModalHeader >Ingresar Token</ModalHeader>
            <ModalBody>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="token">Token</Label>
                        <Input
                            type="text"
                            name="token"
                            id="token"
                            placeholder="Ingrese el token"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                        />
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleSubmit}>
                    Enviar
                </Button>{" "}
                <Button color="secondary" onClick={() => window.location.href = "/" }>
                    Cancelar
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default TokenModal;
