
import { useEffect, useState } from "react";
import { Row, Col, Modal, ModalHeader, ModalBody, Form, Label, Input, Button, FormGroup, ModalFooter } from "reactstrap";

const modeloEmpleado = {
    idEmpleado: 0,
    nombreCompleto: "",
    dpi: "",
    cantidadHijos: "",
    salarioBase: ""

}

const ModalEmpleado = ({ mostrarModal, setMostrarModal, guardarEmpleado, editar, setEditar, editarEmpleado }) => {
    const bonoDecreto = 250;
    const [igss, setIgss] = useState(0);
    const [irtra, setIrtra] = useState(0);
    const [bonoPaternidad, setBonoPaternidad] = useState(0);
    const [salarioTotal, setSalarioTotal] = useState(0);
    const [salarioLiquido, setSalarioLiquido] = useState(0);
    const [empleado, setEmpleado] = useState(modeloEmpleado);
    const actulizarDato = (e) => {
        console.log(e.target.name + ":" + e.target.value);
        setEmpleado({
            ...empleado,
            [e.target.name]: e.target.value
        }

        )

        if (e.target.name === 'salarioBase') {
            const salarioBase = parseFloat(e.target.value);
            const igssValue = salarioBase * 0.0483;
            setIgss(igssValue.toFixed(2));
        }

    }
    useEffect(() => {
        // Calcular IGSS
        const calcularIGSS = parseFloat(empleado.salarioBase) * 0.0483;
        setIgss(calcularIGSS.toFixed(2));

        // Calcular IRTRA
        const calcularIRTRA = parseFloat(empleado.salarioBase) * 0.01;
        setIrtra(calcularIRTRA.toFixed(2));

        // Calcular Bono de Paternidad
        const calcularBonoPaternidad = 133 * parseInt(empleado.cantidadHijos);
        setBonoPaternidad(calcularBonoPaternidad);

        // Calcular Salario Total
        const calcularSalarioTotal = parseFloat(empleado.salarioBase) + parseFloat(calcularBonoPaternidad) + bonoDecreto;
        setSalarioTotal(calcularSalarioTotal.toFixed(2));

        // Calcular Salario Liquido
        const calcularSalarioLiquido = parseFloat(calcularSalarioTotal) - parseFloat(calcularIGSS) - parseFloat(calcularIRTRA);
        setSalarioLiquido(calcularSalarioLiquido.toFixed(2));
    }, [empleado]);
    const enviarDatos = () => {
        if (empleado.idEmpleado == 0) {
            guardarEmpleado(empleado);
        } else { editarEmpleado(empleado) }

        setEmpleado(modeloEmpleado);
    }

    useEffect(() => {
        if (editar != null) {
            setEmpleado(editar)
        } else {
            setEmpleado(modeloEmpleado)
        }
    }, [editar])

    const cerrarModal = () => {
        setMostrarModal(!mostrarModal)
        setEditar(null)

    }

    return (
        <Modal isOpen={mostrarModal}>
            <ModalHeader>
                {empleado.idEmpleado == 0 ? "Nuevo Empleado":"Editar Empleado" }
                
            </ModalHeader>
            <ModalBody>
                <Form >
                    <FormGroup>
                        <Label>Nombre</Label>
                        <Input name="nombreCompleto" onChange={(e) => actulizarDato(e)} value={empleado.nombreCompleto} />
                    </FormGroup>
                    <FormGroup>
                        <Label>DPI</Label>
                        <Input name="dpi" onChange={(e) => actulizarDato(e)} value={empleado.dpi} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Hijos</Label>
                        <Input name="cantidadHijos" onChange={(e) => actulizarDato(e)} value={empleado.cantidadHijos} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Salario Base</Label>
                        <Input name="salarioBase" onChange={(e) => actulizarDato(e)} value={empleado.salarioBase} />
                    </FormGroup>
                    <Row>
                        <Col>
                            <Label>Bono Decreto:</Label>
                            <Input disabled={true} style={{ width: "100%" }} value={bonoDecreto }/>
                        </Col>
                        <Col>
                            <Label>IGSS:</Label>
                            <Input disabled={true} style={{ width: "100%" }} value={isNaN(igss)?0:igss} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Label>IRTRA:</Label>
                            <Input disabled={true} style={{ width: "100%" }} value={isNaN(irtra) ? 0 : irtra } />
                        </Col>
                        <Col>
                            <Label>Bono de Paternidad</Label>
                            <Input disabled={true} style={{ width: "100%" }} value={isNaN(bonoPaternidad)?0:bonoPaternidad } />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Label>Salario Total:</Label>
                            <Input disabled={true} style={{ width: "100%" }} value={isNaN(salarioTotal) ? 0 : salarioTotal} />
                        </Col>
                        <Col>
                            <Label style={{ color: 'green' }}>Salario Liquido:</Label>
                            <Input disabled={true} style={{ width: "100%" }} value={isNaN(salarioLiquido) ? 0 : salarioLiquido} />
                        </Col>
                    </Row>
                </Form>
            </ModalBody>

            <ModalFooter>

                <Button size="sm" color="primary" className="me-2" onClick={enviarDatos} >Guardar</Button>
                <Button size="sm" color="danger" className="me-2" onClick={cerrarModal}>Cerrar </Button>

            </ModalFooter>

        </Modal>
    )

}

export default ModalEmpleado;