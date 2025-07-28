import {
    procesarFormulario,
    altaRegistro,
} from '../../../recursos/js/utilidades.js';
// ----------------------------------------------
// Referenciamos
const formulario = document.getElementById('form-editar');
const mensajes = document.getElementById('mensajes');
// ----------------------------------------------
// Asignar escuchador evento
formulario.addEventListener('submit', async (evento) => {
    evento.preventDefault();
    // Obtener datos formulario
    const datosFormulario = procesarFormulario(formulario);
    // Enviar datos al back
    try{

        const respuesta = await altaRegistro(
            '/api/v1/productos/',
            'POST',
            datosFormulario
        );
        const datos = await respuesta.json();
        const { mensaje } = datos;
        mensajes.innerHTML = mensaje;
    }catch(error){
        console.log(error);
        mensajes.innerHTML = 'No se pudo dar de alta el registro';
    }
});
