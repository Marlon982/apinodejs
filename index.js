//importación de librerias
const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const mongoose = require('mongoose')
const router = express.Router();
const UserSchema = require('./models/User.js')

//conexión base de datos
mongoose.connect("mongodb://admin_Tic:Cicle1234-+@proyectociclo4-shard-00-00.qkpgb.mongodb.net:27017,proyectociclo4-shard-00-01.qkpgb.mongodb.net:27017,proyectociclo4-shard-00-02.qkpgb.mongodb.net:27017/test?replicaSet=atlas-8cqsx0-shard-0&ssl=true&authSource=admin")
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//servicios web
router.get('/', (req, res) => {
    res.send("Hello World");
});
//otro
router.get('/carros', (req, res) => {
    res.send("Servicios Carros");
});
//nombre
router.get('/saludo/:nombre', (req, res) => {
    res.send("Bienvenido " + req.params.nombre);
});

//traer usuarios del User.js
router.get('/user', (req, res) => {
    UserSchema.find(function(err, data){
        if(err){
            console.log(err)
        }else{
            res.send(data)
        }
    })
});

//enviar usuarios
router.post('/user', (req, res) => {
    let newUser = new UserSchema({
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        correo: req.body.correo,
        telefono: req.body.telefono,
        password: req.body.password,
    })
    newUser.save(function(err, data){
        if(err){
            console.log(err)
        }else{
        res.send("Saved successfully " + newUser)
        }
    });
})


//configuración servidor
app.use(router)
app.listen(port,() => {
    console.log('Listening on '+port)
})
