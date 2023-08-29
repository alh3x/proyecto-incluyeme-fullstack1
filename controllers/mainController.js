const fs = require('fs');
const path = require('path');
const serviciosFilePath = path.join(__dirname, '../data/servicios.json');
const servicios = JSON.parse(fs.readFileSync(serviciosFilePath, 'utf-8'));

const mainController = {
    home: (req,res) =>{
        res.render('home', {title:"Barber-shop"})
    },
    servicios:(req,res) =>{
        res.render('servicios', {servicios})
    }
    
}
module.exports = mainController