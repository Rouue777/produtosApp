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

//validar registro e salvar no banco de dados
router.post('/registro/cadastrar', (req,res) => {
    const erros = [];

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto : 'Nome invalido'})
    }

    if(!req.body.email || typeof req.body.email == undefined || req.body.email == null){
        erros.push({texto: 'Email invalido'})
    }

    if(!req.body.password || typeof req.body.password == undefined || req.body.password == null){
        erros.push({texto : 'Senha invalida' })
    }

    if(req.body.password2 !== req.body.password){
        erros.push({texto: 'A senha de confirmação deve ser igual a primeira'})
    }

    if(req.body.password.length < 5){
        erros.push({texto: 'Sua senha deve conter apartir de 5 caracteres'})
    }

    if(erros.length > 0){
        res.render('usuario/registro', {erros : erros})
    }else{
        Usuarios.create({
            nome : req.body.nome,
            email : req.body.email,
            senha : req.body.password
            
        }).then(() =>{
            req.flash('success_msg', 'Cadastro feito com sucesso')
            res.redirect('/')

        }).catch((err) => {
            req.flash('error_msg', 'Houve erro ao salvar cadastro no banco de dados' + err)
            res.redirect('/usuario/registro')
        })
    }


})


export default router;