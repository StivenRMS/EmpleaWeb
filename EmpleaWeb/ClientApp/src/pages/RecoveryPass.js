import React, { useState, useContext } from "react";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import ModalToken from "../Componentes/ModalToken";



   //envia el correo
function enviarCorreoToken(email, token) {
    const requestEmail = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            Email: email,
            Asunto: "Recuperación de Contraseña",
            Cuerpo: "Aquí va tu mensaje con el token de recuperación: ==> "+ token
        })
    };

    fetch("/api/contacto/EnviarCorreoToken", requestEmail)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}







const RecoveryPass = () => {
    const [email, setEmail] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [mostrarModal, setMostrarModal] = useState(false);
    const [tokenApi, setTokenApi] = useState("");

    

    const handleSubmit = (e) => {
        e.preventDefault();
        // Obtener los valores del formulario
        const email = e.target.email.value;
        const birthdate = e.target.birthdate.value;

        

        // Crear el objeto de solicitud
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: '',
                email: email,
                fechaNacimiento: birthdate,
                password: ''
            })
        };

        const requestToken = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: '',
                email: email,
                password: ''
            })
        }

        // Realizar la solicitud de autenticación
        fetch("/api/contacto/AutenticarRecovery", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result);
                if (result === "Autenticación exitosa") {
                    const tokenR = fetch("/api/contacto/Tokenreturn", requestToken).then(response => response.text()).then(result => {
                        enviarCorreoToken(email, result); 
                        setTokenApi(result);
                    })

                    setMostrarModal(true);
                    console.log("Bienvenido");
                } else {
                    alert("Email o Fecha de Nacimiento Incorrecta");
                }

            })
            .catch(error => console.log('error', error));
    };


    return (
        <Container>
            <Row>
                <Col sm={{ size: 8, offset: 2 }} md={{ size: 6, offset: 3 }}>
                    <Form onSubmit={handleSubmit}>
                        <h2>Recuperación de Contraseña</h2>
                        <FormGroup>
                            <Label for="email">Correo Electrónico</Label>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Ingrese su correo electrónico"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="birthdate">Fecha de Nacimiento</Label>
                            <Input
                                type="date"
                                name="birthdate"
                                id="birthdate"
                                placeholder="Ingrese su fecha de nacimiento"
                                value={birthdate}
                                onChange={(e) => setBirthdate(e.target.value)}
                            />
                        </FormGroup>
                        <Button color="primary" type="submit">
                            Recuperar Contraseña
                        </Button>
                    </Form>
                </Col>
            </Row>
            <ModalToken isOpen={mostrarModal} tokenApi={tokenApi} emailA={email } />
        </Container>
    );
}

export default RecoveryPass;
