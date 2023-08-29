const fs = require('fs');
const path = require('path');
const productosFilePath = path.join(__dirname, '../data/productos.json');
const productos = JSON.parse(fs.readFileSync(productosFilePath, 'utf-8'));

const productsController = {
    index: (req, res) => {
        res.set('Cache-Control', 'no-store')
        res.render("productos/products", { productos });
    },
    create: (req, res) => {
        res.render("productos/productCrear")
    },
    store: (req, res) => {
        const newProducto = {
            id: productos[productos.length - 1].id + 1,
            ...req.body,
            imagen:req.file.filename
        }
        productos.push(newProducto)
        fs.writeFileSync(productosFilePath, JSON.stringify(productos, null, " "))
        res.redirect("/productos")
    },
    detail: (req, res) => {
        const prodId = req.params.id;
        const productoDetail = productos.find(product => product.id == prodId)
        res.render("productos/productDetail", { productoDetail });

    },
    edit: (req, res) => {
        const prodId = req.params.id;
        const prodEdit = productos.find(producto => producto.id == prodId);
        res.render("productos/productEdit", { prodEdit })
    },
    update: (req, res) => {
        const prodId = req.params.id;//id del producto
        const index = productos.findIndex(producto => producto.id == prodId);//indice del producto
        const imgFile = !!req.file;
        const imagenVieja = productos[index].imagen;//imagen actual del producto a editar
        const prodEdit = {
            id: prodId,
            ...req.body,
            imagen: imgFile ?req.file.filename : imagenVieja,
        }
        if (imgFile) {productsController.unlink(imagenVieja)};       
        productos.splice(index, 1, prodEdit)//actualiza el producto
        fs.writeFileSync(productosFilePath, JSON.stringify(productos, null, " "))
        res.redirect("/productos");
    },
    delete: (req, res) => {
        const prodId = req.params.id
        const proDelete = productos.find(producto => producto.id == prodId)
        res.set('Cache-Control', 'no-store')
        res.render("productos/productDelete", { proDelete })
    },
    destroy: (req, res) => {
        const prodId = req.params.id;
        const index = productos.findIndex(producto => producto.id == prodId)
        const result = (index === -1)
        if (!result) { 
            productsController.unlink(productos[index].imagen);
            productos.splice(index, 1);
         }
        fs.writeFileSync(productosFilePath, JSON.stringify(productos, null, " "))
        res.redirect("/productos");
    },
    unlink:(filePath)=>{
        const imgPath = path.join(__dirname,"../public/images/productos/",filePath)
        fs.unlink(imgPath, (err => {
            if(err) console.log(err);
            else {console.log("imagen eliminada ")}
        }))
    }



}


module.exports = productsController;