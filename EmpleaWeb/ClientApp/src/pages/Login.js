import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";

const LoginForm = () => {
    const [form, setForm] = useState({ username: "", password: "" });
    const [isLoading, setIsLoading] = useState(false); 
    const handleChanges = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const iniciarSesion = async () => {
        setIsLoading(true);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "name": form.username,
            "email": "",
            "password": form.password
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        try {
            const response = await fetch("/api/contacto/Autenticar", requestOptions);
            const result = await response.text();
            console.log(result);

            if (result === "Autenticación exitosa") {
                setIsLoading(false);
                window.location.href = "/App";
                console.log("Bienvenido");
            } else {
                alert("Usuario o contraseña incorrectos");
            }
        } catch (error) {
            console.log('error', error);
        }
    };



    const handleForgotPassword = () => {
        // Redireccionar a otra página al presionar el enlace "¿Olvidaste tu contraseña?"
        window.location.href = "/RecoveryPass";
    };

    return (
        <Container>
            <Row>
                <Col sm={{ size: 6, offset: 3 }}>
                    <Form className="login-form" onSubmit={iniciarSesion}>
                        <h2>Iniciar sesión</h2>
                        <FormGroup>
                            <Label for="username">Nombre de usuario</Label>
                            <Input
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Ingrese su nombre de usuario"
                                value={form.username}
                                onChange={handleChanges}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Contraseña</Label>
                            <Input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Ingrese su contraseña"
                                value={form.password}
                                onChange={handleChanges}
                            />
                        </FormGroup>
                        <Button color="primary" type="submit" className="btn-login">
                            {isLoading ? "Cargando..." : "Iniciar sesión"}
                        </Button>
                        <p className="forgot-password" onClick={handleForgotPassword} style={{ margin: '30px', color: "blue" }}>
                            ¿Olvidaste tu contraseña?
                        </p>
                    </Form>
                </Col>
            </Row>

            <Button style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)' }} color="success" type="submit" className="btn-login" onClick={() => window.location.href = "/Palindromos"}>Palindromo</Button>
        </Container>
    );
};

export default LoginForm;