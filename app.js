// -*- coding: utf-8 -*-
//Librerias y dependencias


const http = require('http');
const express = require('express');
const app = express();
const bodyParser= require('body-parser');
//app.use(bodyParser.urlencoded({extended: true}));
const path = require('path');
const utils = require('./utils/uploadImg.js');
let ext;
const port = 3000;

//---------------------------------------------------------------

//recursos que se van a cargar en el server 
app.use(express.static(__dirname+'/static'));

//-----------------------------------------------------------------
//Configuración del Servidor
app.set('view engine','ejs');//definimos el motor de plantilla con archivos ejs
app.set('views',path.join(__dirname,"./views"));//definimos la ruta del motor de plantilla
app.use(express.urlencoded({extended:false}));//permite recuperar los valores publicados en un request

const adminRouter = require('./router/adminRouter.js');

app.use('/',adminRouter);

 app.listen(port,()=>{
 console.log('Servidor corriendo exitosamente en el puerto 3000'); 
});


