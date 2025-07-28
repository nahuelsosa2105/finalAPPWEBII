// Importamos/ejecutamos modulo configuraciones
import './config/config.mjs'
// Express -> SP3/H2 p.235 TID AW2
import express from 'express';
// Módulos -> SP5/H3 p.409 TID AW1
import modulosApi from './modulos/modulos.mjs';

const PUERTO = process.env.PUERTO;
// Instanciamos Express
const app = express();
// Modulos
app.use(modulosApi);
// Front admin
app.use(express.static('admin'));
app.listen(PUERTO);
// Atrapamos todos los métodos y rutas no configurados
app.use((req, res) => {
    res.status(404).json({ mensaje: 'No encontrado' });
});
