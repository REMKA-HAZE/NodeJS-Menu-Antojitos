require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization, token'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    );
    next();
});


app.use(bodyParser.urlencoded({ extend: false }));


app.use(bodyParser.json());


app.use(require('./routes/index'));

mongoose.connect('mongodb://localhost:27017/antoja', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    },
    (err, resp) => {
        if (err) throw err;

        console.log('base de datos online <3 ');
    });
app.listen(process.env.PORT);
console.log('escuchando por el puerto '+ process.env.PORT);