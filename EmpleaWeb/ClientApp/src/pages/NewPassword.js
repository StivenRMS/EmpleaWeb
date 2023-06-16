import React, { useState, useContext, useEffect } from "react";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";



const ResetPasswordPage = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [correo, setCorreo] = useState("");

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const email = urlParams.get("emailA");
        setCorreo(email);

    })

    const handleSubmit = (e) => {
        e.preventDefault();

        // Verificar que las contraseñas coincidan
        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }
       
        // Crear el objeto de solicitud
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "Name": "",
                "Email": correo,
                "Password": confirmPassword
            })
        };

        // Realizar la solicitud para restablecer la contraseña
        fetch("/api/contacto/RestablecerContrasena", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result);
                // Aquí puedes manejar la respuesta de la API 
                alert("Contraseña restablecida exitosamente");
                if (result === "ok") {
                    window.location.href = "/"
                }
            })
            .catch(error => console.log('error', error));
    };

    return (
        <Container>
            <Row>
                <Col sm={{ size: 8, offset: 2 }} md={{ size: 6, offset: 3 }}>
                    <Form onSubmit={handleSubmit}>
                        <h2>Restablecer Contraseña</h2>
                        <FormGroup>
                            <Label for="password">Nueva Contraseña</Label>
                            <Input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Ingrese su nueva contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="confirmPassword">Confirmar Contraseña</Label>
                            <Input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                placeholder="Confirme su nueva contraseña"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </FormGroup>
                        <Button color="primary" type="submit">
                            Restablecer Contraseña
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default ResetPasswordPage;
