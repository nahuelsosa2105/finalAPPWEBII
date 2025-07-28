export async function renderizarFormulario(registros, formulario) {
    try {
        const datos = await registros.json()
        if (registros.ok) {
            // Llenar form
           
            formulario.nombre.value = datos[0].nombre;
            formulario.email.value = datos[0].email;
            formulario.telefono.value = datos[0].telefono;
        } else {
            console.log('Registro no encontrado');
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export async function renderizarListado(respuesta) {
    try {
        const datosProveedores = await respuesta.json()
        if (respuesta.ok) {
            const contenedorProveedores =
                document.getElementById('contenedor-proveedores');
            let filas = '';
            datosProveedores.forEach((proveedor) => {
                filas += `
                    <tr>
                        
                        <td>${proveedor.nombre}</td>
                        <td>${proveedor.email}</td>
                        <td>${proveedor.telefono}</td>
                        <td><a href="./editar.html?id=${proveedor.id}">Editar</a></td>
                    </tr>
                `;
            });
            contenedorProveedores.innerHTML = filas;
        } else {
            console.log(datosProveedores.mensaje);
        }
    } catch (error) {
        console.log(error);
    }
}
