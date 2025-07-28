import express from 'express'

// v1
import rutasProductosV1  from './api-crud/v1/productos/rutas.productos.mjs'
import rutasProveedores from './api-crud/v1/proveedores/rutas.proveedores.mjs'

const modulosApi = express.Router()

modulosApi.use(rutasProductosV1)
modulosApi.use(rutasProveedores)


export default modulosApi;
