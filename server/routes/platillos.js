const express = require('express');
const _ = require('underscore');
const Platillos = require('../models/platillos');
const { request } = require('./categoria');
const app = express();

app.post('/registrar', (req, res) => {
    let body = req.body;
    let platillos = new Platillos({

        idCategoria: body.idCategoria,
        strNombre: body.strNombre,
        strDescripcion: body.strDescripcion,
        strIngredientes: body.strIngredientes,
        nmbPiezas: body.nmbPiezas,
        nmbPrecio: body.nmbPrecio,
        blnActivo: body.blnActivo

    });

    platillos.save((err, platDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err: Object.keys(err).length === 0 ? err.message : err
            });
        }
        return res.status(200).json({
            ok: true,
            platDB
        });
    });
});

app.put('/actualizar/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['idCategoria','strNombre','strDescripcion','strIngredientes','nmbPiezas','nmbPrecio','blnActivo' ]);

    Platillos.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, platDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            platDB
        });
    });
});

app.delete('/eliminar/:id', (req, res) => {
    let id = req.params.id;
    Platillos.findByIdAndUpdate(id, { blnActivo: false }, { new: true, runValidators: true, context: 'query' }).then((resp) => {
        return res.status(200).json({
            ok: true,
            status: 200,
            msg: 'Se ha desactivo correctamente el platillo',
            cont: resp

        });
    }).catch((err) => {
        return res.status(400).json({
            ok: false,
            status: 400,
            msg: 'Error al activar el platillo',
            err: Object.keys(err).length === 0 ? err.message : err
        });
    });
});

app.get('/obtener/:idCategoria', (req, res) => {
    Platillos.find({ idCategoria: req.params.idCategoria }).populate('categoria')
        .exec((err, platillos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }
            return res.status(200).json({
                ok: true,
                count: platillos.length,
                cont: platillos
            });

        });
});
app.get('/obtenerId/:id', (req, res) => {
    let id = req.params.id;
    Platillos.find({ _id: id })
        .exec((err, platillos) => { 
            if (err) {
                return res.status(400).json({
                    ok: false,
                    status:400,
                    msg: 'Error al obtener los datos del platillo.',
                    err
                });
            }
        
            return res.status(200).json({
                ok: true,
                status:400,
                msg: 'Se obtuvieron los datos del platillo correctamente.',
                count: platillos.length,
                cont: platillos
            });
        });
});

app.delete('/activar/:id', (req, res) => {
    let id = req.params.id;
    Platillos.findByIdAndUpdate(id, { blnActivo: true }, { new: true, runValidators: true, context: 'query' }).then((resp) => {
        return res.status(200).json({
            ok: true,
            status: 200,
            msg: 'Se ha activado correctamente el platillo',
            cont: resp

        });
    }).catch((err) => {
        return res.status(400).json({
            ok: false,
            status: 400,
            msg: 'Error al activar el platillo',
            err: Object.keys(err).length === 0 ? err.message : err
        });
    });
});

module.exports = app;