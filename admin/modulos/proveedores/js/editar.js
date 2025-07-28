import {
    renderizarFormulario
} from './funciones.js';
import {
    procesarFormulario,
    obtenerParametroId,
    altaRegistro,
    obtenerRegistros,
    eliminarRegistro,
} from '../../../recursos/js/utilidades.js';
// ---------------------------------------------------------
const id = obtenerParametroId();
const formulario = document.getElementById('form-editar');
const botonEliminar = document.getElementById('eliminar-registro');
const mensajes = document.getElementById('mensajes');
// Asignar escuchador evento boton eliminar
botonEliminar.addEventListener('click', async (evento) => {
    evento.preventDefault();
    if (confirm('Eliminar registro?')) {

        const respuesta = await eliminarRegistro(
            '/api/v1/proveedores/' + id
        );
        // Respuestas
        const { mensaje } = await respuesta.json();
        if (respuesta.ok) {
            formulario.style.display = 'none';
        } else {
            console.log(mensaje);
        }
        mensajes.innerHTML = mensaje;
        setTimeout(() => {
            location.href = './';
        }, 2000);
    } else {
        return false;
    }
});
// Asignar escuchador evento enviar formulario (submit)
formulario.addEventListener('submit', async (evento) => {
    evento.preventDefault();
    // Obtener datos formulario
    const datosFormulario = procesarFormulario(formulario);
    // Enviar datos al back
    const respuesta = await altaRegistro(
        '/api/v1/proveedores/' + id,
        'PUT',
        datosFormulario
    );
    // Respuestas
    const { mensaje } = await respuesta.json();
    mensajes.innerHTML = mensaje;
});
// Renderizar datos en formulario
const resultado = await obtenerRegistros('/api/v1/proveedores/' + id);
renderizarFormulario(resultado, formulario);
