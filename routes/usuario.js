import { Sequelize } from "sequelize";
import express from 'express';
import Usuarios from "../models/Usuarios.js";
import Produtos from "../models/Produtos.js";
import bodyParser from "body-parser";
import { Op } from 'sequelize';
import bcrypt from 'bcryptjs'
import passport from "passport";
import LocalStrategy from 'passport-local'
import sequelize from "../models/db.js";
import session from "express-session";

const router = express.Router()

//exibicao pagina de registro
router.get('/registro', (req, res) => {
    res.render('usuario/registro')
})

//validar registro e salvar no banco de dados
router.post('/registro/cadastrar', (req, res) => {
    const erros = [];

    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        erros.push({ texto: 'Nome invalido' })
    }

    if (!req.body.email || typeof req.body.email == undefined || req.body.email == null) {
        erros.push({ texto: 'Email invalido' })
    }

    if (!req.body.password || typeof req.body.password == undefined || req.body.password == null) {
        erros.push({ texto: 'Senha invalida' })
    }

    if (req.body.password2 !== req.body.password) {
        erros.push({ texto: 'A senha de confirmação deve ser igual a primeira' })
    }

    if (req.body.password.length < 5) {
        erros.push({ texto: 'Sua senha deve conter apartir de 5 caracteres' })
    }

    if (erros.length > 0) {
        res.render('usuario/registro', { erros: erros })
    } else {

        Usuarios.findOne({ where: { email: req.body.email } }).then((email) => {
            if (email) {
                req.flash('error_msg', "email já cadastrado, cadastre um novo email")
                res.redirect('/usuario/registro')
            } else {
                const novoUsuario = new Usuarios({
                    nome: req.body.nome,
                    email: req.body.email,
                    senha: req.body.password
                });

                bcrypt.genSalt(10, (erro, salt) => {
                    bcrypt.hash(req.body.password, salt, (erro, hash) => {
                        if (erro) {
                            req.flash('error_msg', "houve erro durante o salvamento do cadastro")
                            res.redirect('/')
                        } else {
                            novoUsuario.senha = hash

                            novoUsuario.save().then(() => {
                                req.flash('success_msg', 'Cadastro feito com successo')
                                res.redirect('/')
                            }).catch((err) => {
                                req.flash('error_msg', 'Erro durante o salvamento do cadastro' + err)
                                res.redirect('/usuario/registro')
                            })
                        }
                    })
                })
            }

        })




    }


})

//area de login
router.get('/login', (req, res) => {
    res.render('usuario/login')
})

//autenticacao
router.post('/login/autenticar', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/usuario/login',
        failureFlash: true
    })(req, res, next);
})

//logout
router.get('/login/sair', (req, res) => {
    req.logOut((err) => {
        if (err) {
            req.flash('error_msg', 'por algum motivo houve ao deslogar')
            res.redirect('/')
        } else {
            req.flash('success_msg', 'você foi deslogado')
            res.redirect('/')
        }
    })
})




export default router;