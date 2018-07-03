var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var Ddos = require('ddos')
var ddos = new Ddos({burst:3,limit:5});

var app = express();


app.use(ddos.express)
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const ctrlTelegram = require('./api/telegramMsg');
app.use('/telegram', ctrlTelegram.sendMsg);


module.exports = app;
