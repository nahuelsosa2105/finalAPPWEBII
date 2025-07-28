/*
Conecta capa de datos a respuesta clientes
*/
import * as modelo from './modelo.productos.mjs';

async function obtenerProductos(req, res) {
    try {
        const resultado = await modelo.obtenerProductos();
        if (resultado.rows.length > 0) {
            res.json(resultado.rows);
        } else {
            res.status(404).json({ mensaje: 'Productos no encontrados' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
}

async function obtenerProducto(req, res) {
    try {
        // Asignación desestructurante SP5/H4 p.417 TID AW1
        const { id } = req.params;
        const resultado = await modelo.obtenerProducto(id);
        if (resultado.rows.length > 0) {
            res.json(resultado.rows);
        } else {
            res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
}

async function crearProducto(req, res) {
    try {
        // Asignación desestructurante SP5/H4 p.417 TID AW1
        const { codigo, nombre, marca, stock } = req.body;
        // Verificamos
        if (!codigo || !nombre || !marca || !stock) {
            return res.status(400).json({ mensaje: 'Datos incompletos' });
        }
        const resultado = await modelo.crearProducto({
            codigo,
            nombre,
            marca,
            stock,
        });
        // { codigo: codigoCreado } -> porque codigo ya está declarada en este ámbito
        // Ámbito SP4/H3 p.263 TID AW1
        const { codigo: codigoCreado } = resultado.rows[0];
        res.json({ mensaje: `Producto ${codigoCreado} dado de alta` });
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
}

async function modificarProducto(req, res) {
    try {
        // Asignación desestructurante SP5/H4 p.417 TID AW1
        const { id } = req.params;
        const { codigo, nombre, marca, stock } = req.body;
        // Verificamos
        if (!id || !codigo || !nombre || !marca || !stock) {
            return res.status(400).json({ mensaje: 'Datos incompletos' });
        }
        const resultado = await modelo.modificarProducto({
            id,
            codigo,
            nombre,
            marca,
            stock,
        });
        // { codigo: codigoModificado } -> porque codigo ya está declarada en este ámbito
        // Ámbito SP4/H3 p.263 TID AW1
        const { codigo: codigoModificado } = resultado.rows[0];
        res.json({ mensaje: `Producto ${codigoModificado} modificado` });
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
}

async function eliminarProducto(req, res) {
    try {
        // Asignación desestructurante SP5/H4 p.417 TID AW1
        const { id } = req.params;
        const resultado = await modelo.eliminarProducto(id);
        if (resultado.rows.length > 0) {
            const { codigo: codigoEliminado } = resultado.rows[0];
            res.status(200).json({ mensaje: `Producto con código: ${codigoEliminado} eliminado` });
        } else {
            res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
}
export { obtenerProductos, obtenerProducto, crearProducto, modificarProducto, eliminarProducto };
