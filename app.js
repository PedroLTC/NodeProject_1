const validator = require('validator');
const data = require('./apiService');
const path = require('path');
const hbs = require('hbs');
const express = require('express');
const { response } = require('express');
const app = express();

const viewsPath = path.join(__dirname, 'templates/views');
const partialPath = path.join(__dirname, 'templates/partials');
const publicPath = path.join(__dirname, 'public');

app.use(express.static(publicPath));
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

app.get('', (req, res) => {

    res.render('index');

});

app.get('/cotizacion', (req, res) => {
    console.log("Hicieron consulta desde el Formulario de Cotización");
    const Currency = req.query.currency;
    const DateStart = req.query.dateStart;
    const DateEnd = req.query.dateEnd;
    console.log(`Los datos enviados del Front son: ${Currency} ${DateStart} ${DateEnd}`)

    const fechaS = validator.isDate(DateStart, new Date());
    const fechaE = validator.isDate(DateEnd, new Date());
    const CompFecha = validator.isAfter(DateStart, DateEnd);

    if (!fechaS || !fechaE || CompFecha) {

        res.send([{ error: "Formato de fecha inválido" }])
        console.log({ error: "Formato de fecha inválido" });
    } else {

        data.getPrice(Currency, DateStart, DateEnd, (error, data) => {
            if (error) {
                res.send([{ error: "Ocurrió un error" }]);
                console.log(error);
            } else {
                res.send(data);

            }
        });

    }





});

app.get('/contacto', (req, res) => {

    res.render('contacto');

    const fName = req.query.fname;
    const eMail = req.query.eMail;
    const phone = req.query.phone;
    const textA = req.query.exampleTextarea;
    let datausers = new Object();
    


    if (!(fName === undefined) || !(eMail === undefined) || !(phone === undefined) || !(textA === undefined)) {

        console.log(`Los datos enviados desde contacto front son: ${fName} ${eMail} ${phone} ${textA}`);
        const isEmail = validator.isEmail(eMail); //Para efectos de ejemplo solo se vaálida este dato

        if (!isEmail) {

            res.send({ codigo: "60" }); //código 60 error de email
        } else {

            res.send({ codigo: "50" }); //código 50 datos recibidos

            
        }

        // Este objeto despues puede ser enviado a una base de datos

        datausers.nombre = fName;
        datausers.correo = eMail;
        datausers.telefono = phone;
        datausers.comentario = textA;
        console.log(datausers);
        
        
    }


});



app.listen(3000, () => { console.log('successful connection') });