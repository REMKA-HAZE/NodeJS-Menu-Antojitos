const express = require('express');
const app = express();


app.use('/categoria',require('./categoria'));
app.use('/platillos',require('./platillos'));

module.exports = app;