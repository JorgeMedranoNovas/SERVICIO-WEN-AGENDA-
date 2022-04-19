// RutasWeb.js
const express = require('express');
const res = require('express/lib/response');
const router = express.Router();

const Contactos = require('../models/contactos')
/*let dataInfo = [
    {id: 1, nombre: "John", apellido: "Lee", correo: "lee@gmail.com"}
     ]
*/

router.get('/', async (req, res) => {
    const logd = {
        usuario: '20210912',
        password: 'pongameun100'
    
    }    
    res.render("login", {
        logd
    })    
})

router.get('/crud', async (req, res) => {

    try{
        const dataInfo = await Contactos.find();
        console.log(dataInfo, "asq")
        const contactosDB = {
            _id: "0",
        }
        res.render("Crud", {
            dataInfo,
            contactos: contactosDB
        })
    }catch(error){
        console.log(error);
    }

    // console.log(__dirname)
    
})
/*
router.get('/crear', () => {
    res.render('')
})*/

router.post('/crud', async(req, res) => {
    const body = req.body
    try{
        const contactosDB = new Contactos(body)
        await contactosDB.save()
        res.redirect('/crud')
    }catch(error){

    }
})

router.get('/crud/:id', async(req,res) =>{
    const id = req.params.id
    try {
        const contactosDB = await Contactos.findOne({ _id: id })
        console.log(contactosDB)
        const dataInfo = await Contactos.find();

        res.render("Crud", {
            dataInfo,
            contactos: contactosDB,
            error: false
        })
    } catch (error) {
        res.render("Crud", {
            error: true,
            mesaje: 'no se encuentra el ID seleccionado'
        })
    }
})

router.delete('/crud/:id', async(req,res) =>{
    const id = req.params.id
    //const contactosDBD = await Contactos.findOne({ _id: id })
    const dataInfo = await Contactos.find();
    const contactosDB = {
        _id: "0",
    }
    try {
        console.log(id, " soy el id")
        const contactosDBD = await Contactos.findByIdAndDelete({_id:id})

        /*const contactosDB = {
            _id: "0",
        }*/
        if (!contactosDBD) {
            res.json({
                estado: false,
                mensaje: 'No se puede eliminar'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'eliminado!'
            })
        }
    } catch (error) {
        console.log(error)
    }
})

router.put('/crud/:id', async(req,res) =>{
    const id = req.params.id
    const body = req.body
    console.log(id, "soy yb bonito id")
    console.log(body, "soy un bonito bd")
    try {
        const contactosDB = await Contactos.findByIdAndUpdate(id,body, {useFindAndModify: false})
        console.log(contactosDB, " ayudaaaa")

        res.json({
            estado:true
        })
    } catch (error) {
        res.json({
            estado:false
        })
        console.log(error)
    }
})

module.exports = router;
