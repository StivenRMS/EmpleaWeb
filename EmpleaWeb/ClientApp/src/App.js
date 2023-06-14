import React from 'react';
import { useEffect, useState } from 'react';
import { Col, Container, Row, Card, CardHeader, CardBody, Button } from "reactstrap";
import TablaEmpleados from "./Componentes/TablaEmpleados";
import ModalEmpleado from "./Componentes/ModalEmpleado";



const App = () => {

    const [empleado, setEmpleado] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [editar, setEditar] = useState(null);


    const obtenerEmpleados = async () => {

        const respuesta = await fetch("api/contacto/GetEmpleados");



        if (respuesta.ok) {
            const data = await respuesta.json();
            setEmpleado(data);


        } else {
            console.log("Error en la lista de Empleados");
        }

    }

    useEffect(() => {
        obtenerEmpleados();
    }, []);

    const guardarEmpleado = async (empleado) => {
        const empleadoData = {
            dpi: empleado.dpi,
            nombreCompleto: empleado.nombreCompleto,
            cantidadHijos: empleado.cantidadHijos,
            bonoDecreto: 250,
            fechaCreacion: new Date(),
            salarioBase: empleado.salarioBase
        };

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify(empleadoData)
        };

        try {
            const response = await fetch("/api/contacto/AddEmpleado", requestOptions);
            if (response.ok) {
                setMostrarModal(!mostrarModal);
                obtenerEmpleados();
            } else {
                console.log("Error en la solicitud:", response.status, response.statusText);
            }
        } catch (error) {
            console.log("Error en la solicitud:", error);
        }
    };

    const editarEmpleado = async (empleado) => {
        const response = await fetch("api/contacto/Editar", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify(empleado)
        })

            if (response.ok) {
            setMostrarModal(!mostrarModal);
                obtenerEmpleados();
        }
        
            

    };

    const eliminarEmpleado = async (id) => {

        var respuesta = window.confirm("Desea eliminar el contacto?");
        if (!respuesta) {
            return;
        }
        const response = await fetch("api/contacto/Eliminar/" + id, {
            method: "DELETE",
           
           
        })

        if (response.ok) {
            obtenerEmpleados();
        }

       



    };





    return (
        <Container>
            <Row className="mt-5">

                <Col sm="12">
                    <Card>
                        <CardHeader>
                            <h5 className="text-center">Lista de Empleados</h5>
                        </CardHeader>
                        <CardBody>
                            <Button size="sm" color="success" onClick={() => setMostrarModal(!mostrarModal)}>Nuevo Empleado</Button>
                            <hr></hr>
                            <TablaEmpleados data={empleado} setEditar={setEditar} mostrarModal={mostrarModal} setMostrarModal={setMostrarModal} eliminarEmpleado={eliminarEmpleado } />
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            <ModalEmpleado
                mostrarModal={mostrarModal}
                setMostrarModal={setMostrarModal}
                guardarEmpleado={guardarEmpleado}
                editar={editar}
                setEditar={setEditar}
                editarEmpleado={editarEmpleado }
            />
        </Container>
    )
}

export default App;