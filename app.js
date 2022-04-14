// app.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000;

//body-parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//base de datos
const password = "umnNXn1nrVvyrGRn";
const uri = `mongodb+srv://20210308:${password}@cluster0.riwyn.mongodb.net/crud?retryWrites=true&w=majority`;

const mongoose = require("mongoose");
mongoose.connect(uri,
        { useNewUrlParser: true, useUnifiedTopology: true}
)       .then(() => console.log("BD conectada"))
        .catch((e) => console.log(e));



// motor de plantillas
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + "/public"));

//Rutas web
app.use('/', require('./router/rutas'));

//Rutas web
//app.get("/", (req, res) => {
//    res.sendFile(__dirname + "/public/login.html");
//}); this
/*app.get("/", (req, res) => {
    res.sendFile(__dirname + "/router/rutas.js");
});*/





//404
//app.use((req, res, next) =>{
//    res.status(404).sendFile(__dirname + "/public/404.html")
//})

app.listen(port, () => {
    console.log("Esta vivooo", port)
})