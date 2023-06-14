import { Table, Button } from "reactstrap";

const TablaEmpleados = ({ data, setEditar, mostrarModal, setMostrarModal, eliminarEmpleado }) => {

    const enviarDatos = (empleado) => {
        console.log("se enviaron los datos: ",empleado)
        setEditar(empleado);
        setMostrarModal(!mostrarModal);
    }

    return (
        <Table striped responsive>
            <thead>
                <tr>

                    <th>Dpi</th>
                    <th>Nombre Completo</th>
                    <th>Cantidad Hijos</th>
                    <th>Bono Decreto</th>
                    <th>Fecha Creacion</th>
                    <th>Salario Base</th>
                </tr>
            </thead>
            <tbody>
                {
                    (data.length < 1) ? (
                        <tr>
                            <td colSpan="6">Sin registro</td>
                        </tr>
                    ) : (
                            data.map((item) => (
                            
                            <tr key={item.id}>
                                <td>{item.dpi}</td>
                                <td>{item.nombreCompleto}</td>
                                <td>{item.cantidadHijos}</td>
                                <td>{item.bonoDecreto}</td>
                                <td>{item.fechaCreacion}</td>
                                <td>{item.salarioBase}</td>
                                <td>
                                    <Button size="sm" color="primary" className="me-2" onClick={()=>enviarDatos(item) }>Editar</Button>
                                        <Button size="sm" color="danger" className="me-2" onClick={() => eliminarEmpleado(item.id)}>Eliminar</Button>
                                </td>
                            </tr>


                        ))
                    )


                }
            </tbody>
        </Table>
    );
}

export default TablaEmpleados;