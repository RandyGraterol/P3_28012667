require('dotenv').config();
const {contrasena,admin} = process.env;

const models = require('../models/baseDatos.js');
////////////////////////////////////////////////
//Funciones callback
const index = (req,res)=>{
res.render('index.ejs');
}
////////////////////////////////////////////////
const login = (req,res)=>{
res.render('iniciarSesion.ejs');
}
////////////////////////////////////////////////
const loginPost = (req,res)=>{

const {admin,password} = req.body;

   if(admin === admin && password === contrasena){
    res.redirect('/productos');
   }else{
   res.redirect('/*');
   }

}
//////////////////////////////////////////////
const add = (req,res)=>{
res.render('add.ejs');
}
//////////////////////////////////////////////
const addImg = (req,res)=>{
models.getImagen(req,res);
}
/////////////////////////////////////////////
const addImgPost = (req,res)=>{
 models.aggIMG(req,res);
}
/////////////////////////////////////////////
const addPost = (req,res)=>{
models.aggDato(req,res);
}
/////////////////////////////////////////////
const productos = (req,res)=>{
models.mostrarProductos(req,res);
}
////////////////////////////////////////////
const getUpdate = (req,res)=>{
models.mostrarUpdate(req,res);
}
////////////////////////////////////////////
const updatePost = (req,res)=>{
models.update(req,res);
}
////////////////////////////////////////////
const getDelete = (req,res)=>{
models.mostrarDelete(req,res);
}
////////////////////////////////////////////
const deletePost = (req,res)=>{
models.deletee(req,res);
}
////////////////////////////////////////////
const categorias = (req,res)=>{
models.getCategorias(req,res);
}
////////////////////////////////////////////
const addCategorias = (req,res)=>{
res.render('addcategoria.ejs');
}
////////////////////////////////////////////
const addCPost = (req,res)=>{
models.postCategorias(req,res);
}
////////////////////////////////////////////
const updateC = (req,res)=>{
models.mostrarUpdateC(req,res);
}
////////////////////////////////////////////
const updateCPost = (req,res)=>{
models.updateCateg(req,res);
}
////////////////////////////////////////////
const eliminarC = (req,res)=>{
models.deleteCategoriaGET(req,res);
}
///////////////////////////////////////////
const clientes = (req,res)=>{
console.log('mostrando pagina la cliente!');
models.ClientesGET(req,res);
}
//////////////////////////////////////////
const cliente = (req,res)=>{
 models.filtrar(req,res);
}
//////////////////////////////////////////
const detalles = (req,res)=>{
 models.detalles(req,res);
}
//////////////////////////////////////////
const notFound = (req,res)=>{
 res.render('found.ejs');
}
//////////////////////////////////////////
module.exports={
	index,
	login,
	loginPost,
	add,
	addImg,
	addImgPost,
	addPost,
	productos,
	getUpdate,
	updatePost,
	getDelete,
	deletePost,
	categorias,
	addCategorias,
	addCPost,
	updateC,
	updateCPost,
	eliminarC,
	clientes,
	cliente,
	detalles,
	notFound
}