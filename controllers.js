// -*- coding: utf-8 -*-
//Librerias y dependencias
const cookieParser = require('cookie-parser');
require('dotenv').config();
const multer = require('multer');
const http = require('http');
const express = require('express');
const app = express();
app.use(cookieParser());
app.use(express.json());
const jwt = require('jsonwebtoken');
const bodyParser= require('body-parser');
//app.use(bodyParser.urlencoded({extended: true}));
const path = require('path');
const baseDatos = require('./models/baseDatos.js');
const utils = require('./utils/uploadImg.js');
//middleware para verificar cliente
const {verifyToken} = require('./utils/JWT.js');
//middleware para verificar admin
const {verifyToken2} = require('./utils/JWT2.js');
//Variables de entorno
const {contrasena,admin,port,secretKey2} = process.env;
let ext;
let login= false;


//--------------------------------------------------------------
let storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, './static/uploads')
  },
  filename: function (req, file, cb) {
    ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + Date.now() + utils.getContentType(ext))
  }
});

let upload = multer({ storage: storage });
//---------------------------------------------------------------

//recursos que se van a cargar en el server 
app.use(express.static(__dirname+'/static'));

//-----------------------------------------------------------------
//Configuración del Servidor
app.set('view engine','ejs');//definimos el motor de plantilla con archivos ejs
app.set('views',path.join(__dirname,"./views"));//definimos la ruta del motor de plantilla
app.use(express.urlencoded({extended:false}));//permite recuperar los valores publicados en un request

app.listen(port,()=>{
  console.log(`Servidor corriendo exitosamente en el puerto ${port}`);
});




//-----------------------------------------------------------
//enruptamiento
app.get('/',(req,res)=>{
  res.render('index.ejs')
});

app.get('/login',(req,res)=>{
res.render('iniciarSesion.ejs');
});


app.post('/login',(req,res)=>{

 const {admin,password} = req.body;

 const dato= {
  admin,
  password
 }

   if(admin === admin && password === contrasena){
    const token = jwt.sign(dato,secretKey2,{expiresIn:60 * 60 * 24});
   // Guardar token en cookies
    res.cookie('token2', token, { httpOnly: true, secure: true });
    res.redirect('/productos');
   }else{
    login=false;
   res.redirect('/*');
   }

});
  

app.get('/add',verifyToken2,(req,res)=>{
res.render('add.ejs');
});

//---------------------------------------------------------
app.get('/addImagen/:id',verifyToken2,(req,res)=>{
baseDatos.getImagen(req,res);
});


app.post('/addImagen/:id',upload.single('img'),(req,res)=>{ 
baseDatos.aggIMG(req,res);
});


app.post('/addPost',(req,res)=>{   
baseDatos.aggDato(req,res);
});


app.get('/productos',verifyToken2,(req,res)=>{
  baseDatos.mostrarProductos(req,res);
});
//-------------------------------------------------------
// GET /editar/:id
app.get('/update/:id',verifyToken2,(req, res) => {
baseDatos.mostrarUpdate(req,res);

});
//-------------------------------------------------------
// POST /editar/:id
app.post('/update/:id', (req, res) => {
 baseDatos.update(req,res);
});
//-------------------------------------------------------
// GET /eliminar/:id
app.get('/delete/:id',verifyToken2,(req, res) => {
 baseDatos.mostrarDelete(req,res);
});
//-------------------------------------------------------
// POST /eliminar/:id
app.post('/delete/:id',(req, res) => {
 baseDatos.deletee(req,res);
});
//------------------------------------------------------
app.get('/categorias',verifyToken2,(req, res) => {
 baseDatos.getCategorias(req,res);
});
//-------------------------------------------------------
app.get('/addCategorias',verifyToken2,(req, res) => {
 res.render('addcategoria.ejs');
});
//-------------------------------------------------------
app.post('/addcategorias', (req, res) => {
 baseDatos.postCategorias(req,res);
});
//-------------------------------------------------------
app.get('/updateCategoria/:id',verifyToken2,(req,res)=>{
 baseDatos.mostrarUpdateC(req,res);
});
//-------------------------------------------------------
app.post('/updateCategoria/:id',(req,res)=>{
baseDatos.updateCateg(req,res);
});
//-------------------------------------------------------
app.get('/eliminarCategoria/:id',verifyToken2,(req,res)=>{
baseDatos.deleteCategoriaGET(req,res);
});
//-------------------------------------------------------
app.get('/clientes',verifyToken,(req,res)=>{
  const user = req.user;
console.log('mostrando plantilla clientes.ejs!');
baseDatos.ClientesGET(req,res);
})
//--------------------------------------------------
app.get('/cliente',(req, res) => {
 baseDatos.filtrar(req,res);
});
//-------------------------------------------------------
app.get('/detalles/:id',verifyToken,(req,res)=>{
baseDatos.detalles(req,res);
});
//-------------------------------------------------------
app.get('/loginUsers',(req,res)=>{
baseDatos.loginUsers(req,res);
});
//------------------------------------------------------
app.post('/loginUsers',(req,res)=>{
  baseDatos.postLoginCliente(req,res);
})
//------------------------------------------------------
app.get('/registroUsers',(req,res)=>{
  baseDatos.registroUsers(req,res);
});
//------------------------------------------------------
app.post('/registroUsuariosPost',(req,res)=>{
 baseDatos.registroUsuariosPost(req,res);  
})
//------------------------------------------------------
app.get('/logout',(req, res) => {
  res.clearCookie('token');
  res.redirect('/');
});
//------------------------------------------------------
app.get('/logout2',(req, res) => {
  res.clearCookie('token2');
  res.redirect('/');
});
//------------------------------------------------------
//Metodo para manejar rutas no encontradas
app.get('/*',(req,res)=>{
res.render('found.ejs')
});
//-------------------------------------------------------
