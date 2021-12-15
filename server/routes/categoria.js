const express = require('express');
const _ = require('underscore');
const Categoria = require('../models/categoria');
const app = express();

app.post('/registrar', (req, res) => {
    let body = req.body;
    let categoria = new Categoria({
        strNombre: body.strNombre,
        strDescripcion: body.strDescripcion,
        blnActivo: body.blnActivo,
    });

    categoria.save((err, catDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            catDB
        });
    });
});

app.put('/actualizar/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['strNombre', 'strDescripcion', 'blnActivo' ]);

    Categoria.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, catDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            catDB
        });
    });
});

app.get('/obtener', (req, res) => {
    Categoria.find({  })
        .exec((err, categorias) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }
            return res.status(200).json({
                ok: true,
                count: categorias.length,
                categorias
            });

        });
});
app.get('/obtener/:id', (req, res) => {
    let id = req.params.id;
    Categoria.find({  _id: id })
        .exec((err, categoria) => { 
            if (err) {
                return res.status(400).json({
                    ok: false,
                    status:400,
                    msg: 'Error al obtener el nombre de la categoria.',
                    err: Object.keys(err).length === 0 ? err.message : err
                });
            }
        
            return res.status(200).json({
                ok: true,
                status:400,
                msg: 'Se obtuvo el nombre de la categoria.',
                count: categoria.length,
                cont: categoria
                
            });
        });
});

app.delete('/activar/:id', (req, res) => {
    let id = req.params.id;
    Categoria.findByIdAndUpdate(id, { blnActivo: true }, { new: true, runValidators: true, context: 'query' }).then((resp) => {
        return res.status(200).json({
            ok: true,
            status: 200,
            msg: 'Se ha activado correctamente la categoria',
            cont: resp

        });
    }).catch((err) => {
        return res.status(400).json({
            ok: false,
            status: 400,
            msg: 'Error al activar la categoria',
            err: Object.keys(err).length === 0 ? err.message : err
        });
    });
});

app.delete('/eliminar/:id', (req, res) => {
    let id = req.params.id;
    Categoria.findByIdAndUpdate(id, { blnActivo: false }, { new: true, runValidators: true, context: 'query' }).then((resp) => {
        return res.status(200).json({
            ok: true,
            status: 200,
            msg: 'Se ha desactivo correctamente la categoria',
            cont: resp

        });
    }).catch((err) => {
        return res.status(400).json({
            ok: false,
            status: 400,
            msg: 'Error al activar la categoria',
            err: Object.keys(err).length === 0 ? err.message : err
        });
    });
});

module.exports = app;