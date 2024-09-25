import { Sequelize } from "sequelize";
import express from 'express';
import Usuarios from "../models/Usuarios.js";
import Produtos from "../models/Produtos.js";
import bodyParser from "body-parser";
import {Op} from 'sequelize';

const router = express.Router()
//exibicao pagina de login
router.get('/login', (req,res) =>{
    res.render('usuario/login')
})




//exibicao pagina de registro
router.get('/registro', (req,res) => {
    res.render('usuario/registro')
})



export default router;