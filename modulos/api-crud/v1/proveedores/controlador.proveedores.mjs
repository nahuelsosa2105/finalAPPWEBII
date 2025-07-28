/*
Conecta capa de datos a respuesta clientes
*/
import * as modelo from './modelo.proveedores.mjs';

async function obtenerProveedores(req, res) {
    try {
        const resultado = await modelo.obtenerProveedores();
        if (resultado.rows.length > 0) {
            res.json(resultado.rows);
        } else {
            res.status(404).json({ mensaje: 'Proveedores no encontrados' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
}

async function obtenerProveedor(req, res) {
    try {
        // Asignación desestructurante SP5/H4 p.417 TID AW1
        const { id } = req.params;
        const resultado = await modelo.obtenerProveedor(id);
        if (resultado.rows.length > 0) {
            res.json(resultado.rows);
        } else {
            res.status(404).json({ mensaje: 'Proveedor no encontrado' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
}

async function crearProveedor(req, res) {
    try {
        // Asignación desestructurante SP5/H4 p.417 TID AW1
        const { nombre, telefono, email} = req.body;
        // Verificamos que esten todos los datos
        if (!nombre || !telefono || !email) {
            return res.status(400).json({ mensaje: 'Datos incompletos' });
        }
        const resultado = await modelo.crearProveedor({
            
            nombre,
            telefono,
            email,
        });
        // { codigo: codigoCreado } -> porque codigo ya está declarada en este ámbito
        // Ámbito SP4/H3 p.263 TID AW1
        const { nombre: proveedorCreado } = resultado.rows[0];
        res.json({ mensaje: `Proveedor ${proveedorCreado} dado de alta` });
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
}

async function modificarProveedor(req, res) {
    try {
        // Asignación desestructurante SP5/H4 p.417 TID AW1
        const { id } = req.params;
        const {  nombre, telefono, email } = req.body;
        // Verificamos
        if (!id || !nombre || !telefono || !email) {
            return res.status(400).json({ mensaje: 'Datos incompletos' });
        }
        const resultado = await modelo.modificarProveedor({
            id,
            
            nombre,
            telefono,
            email,
        });
        // { codigo: codigoModificado } -> porque codigo ya está declarada en este ámbito
        // Ámbito SP4/H3 p.263 TID AW1
        const { nombre: proveedorModificado } = resultado.rows[0];
        res.json({ mensaje: `Proveedor ${proveedorModificado} modificado` });
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
}

async function eliminarProveedor(req, res) {
    try {
        // Asignación desestructurante SP5/H4 p.417 TID AW1
        const { id } = req.params;
        const resultado = await modelo.eliminarProveedor(id);
        if (resultado.rows.length > 0) {
            const { nombre: proveedorEliminado } = resultado.rows[0];
            res.status(200).json({ mensaje: `Proveedor : ${proveedorEliminado} eliminado` });
        } else {
            res.status(404).json({ mensaje: 'Proveedor no encontrado' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
}
export { obtenerProveedores, obtenerProveedor, crearProveedor, modificarProveedor, eliminarProveedor };
