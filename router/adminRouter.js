const express = require('express');
const router = express.Router();
const controllers = require('../controllers/adminControllers.js');
const multer = require('multer');
//--------------------------------------------------------------
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './static/uploads')
  },
  filename: function (req, file, cb) {
    ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + Date.now() + utils.getContentType(ext))
  }
})

let upload = multer({ storage: storage });

//Rutas GET
router.get('/',controllers.index);
router.get('/login',controllers.login);
router.get('/add',controllers.add);
router.get('/addImagen/:id',controllers.addImg);
router.get('/productos',controllers.productos);
router.get('/update/:id',controllers.getUpdate);
router.get('/delete/:id',controllers.getDelete);
router.get('/categorias',controllers.categorias);
router.get('/addCategorias',controllers.addCategorias);
router.get('/updateCategoria/:id',controllers.updateC);
router.get('/eliminarCategoria/:id',controllers.eliminarC);
router.get('/clientes',controllers.clientes);
router.get('/cliente',controllers.cliente);
router.get('/detalles/:id',controllers.detalles);
router.get('/*',controllers.notFound);
/////////////////////Randis Graterol///////////////////////////////
//Rutas Post 
router.post('/login',controllers.loginPost);
router.post('/addImagen/:id',upload.single('img'),controllers.addImgPost);
router.post('/addPost',controllers.addPost);
router.post('/update/:id',controllers.updatePost);
router.post('/delete/:id',controllers.deletePost);
router.post('/addcategorias',controllers.addCPost);
router.post('/updateCategoria/:id',controllers.updateCPost);

module.exports=router;