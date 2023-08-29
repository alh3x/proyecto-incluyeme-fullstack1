const express = require('express');
const app = express();
const path = require("path");
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.listen(3000, () => console.log("Server corriendo en el puerto 3000"));

//-----

const mainRoute = require("./routes/main")
const productsRoute = require("./routes/products")


app.use("/", mainRoute)
app.use("/productos", productsRoute);