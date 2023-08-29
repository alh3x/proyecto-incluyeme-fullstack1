const express = require('express')
const router = express.Router();
const multer = require('multer');
const uploadFile = require('../middlewares/uploadImage')
const productsController = require("../controllers/productsController")

router.get('/', productsController.index);
router.get('/create', productsController.create);
router.post('/create',uploadFile.single('imagen'),productsController.store);
router.get('/detalle/:id', productsController.detail);
router.get('/edit/:id',productsController.edit);
router.patch('/edit/:id',uploadFile.single('imagen'), productsController.update);
router.get('/delete/:id', productsController.delete);
router.delete('/delete/:id', productsController.destroy)




module.exports = router;