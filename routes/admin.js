import { Sequelize } from "sequelize";
import express from 'express';
import Usuarios from "../models/Usuarios.js";
import Produtos from "../models/Produtos.js";
import bodyParser from "body-parser";
import {Op} from 'sequelize';
import eAdmin from "../helpers/eAdmin.js";


const router = express.Router()



//pagina principal das rotas admin
router.get('/adicionarprodutos', eAdmin.eAdmin, (req, res) => {
  res.render('admin/addProdutos')
})

//adicionar valores ao banco de dados
router.post('/adicionarprodutos', eAdmin.eAdmin, (req, res) => {
  //validar formularios
  const erros = [];

  if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
    erros.push({ texto: 'Produto precisa ter um nome' })
  }

  if (!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null) {
    erros.push({ texto: 'Slug não pode estar vazio' })
  }

  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  if (!slugRegex.test(req.body.slug)) {
    erros.push({ texto: 'Slug não deve conter caracteres especiais nem maiusculas' })
  }

  if (!req.body.detalhes || typeof req.body.detalhes == undefined || req.body.detalhes == null) {
    erros.push({ texto: 'Detalhes não pode estar vazio' })
  }

  if (req.body.detalhes.length <= 30) {
    erros.push({ texto: 'Adicione mais informações á "detalhes"' })
  }

  if (!req.body.preco || typeof req.body.preco == undefined || req.body.preco == null) {
    erros.push({ texto: 'Preço invalido' })
  }

  if (!req.body.estoque || typeof req.body.estoque == undefined || req.body.estoque == null) {
    erros.push({ texto: 'Estoque invalido' })
  }

  if (!req.body.img || typeof req.body.img !== 'string' || req.body.img == null || req.body.img.trim() === '') {
    erros.push({ texto: 'Link da imagem invalido' })
  }

  if (erros.length === 0) {
    //criando schema
    const novoProduto = Produtos.build({
      nome: req.body.nome,
      detalhes: req.body.detalhes,
      preco: req.body.preco,
      imagem: req.body.img,
      estoque: req.body.estoque,
      slug: req.body.slug
    });
    //salvando no banco de dados
    novoProduto.save().then(() => {
      req.flash('success_msg', `Produto ${req.body.nome} Salvo com sucesso`)
      res.redirect('/admin/adicionarprodutos')
    }).catch((err) => {
      req.flash('error_msg', 'houve um erro ao salvar' + err)
      res.redirect('/admin/adicionarprodutos')
    })

  } else {
    res.render('admin/addProdutos', { erros: erros })
  }

})

//pagina para exibir o produto para admins
router.get('/editProdutos', eAdmin.eAdmin, (req, res) => {
  Produtos.findAll().then((produtos) => {
    res.render('admin/editProdutos', { produtos })
  }).catch((err) => {
    console.log('não foi possivel achar os produtos' + err)
  })

})

//deletar produtos
router.get('/produtos/delete/:id/:nome', eAdmin.eAdmin, (req, res) => {
  const nome = req.params.nome
  const id = req.params.id
  console.log(id, nome)
  Produtos.destroy({ where: { id: id } }).then(() => {
    req.flash('success_msg', `O produto ${nome} foi deletado com sucesso`)
    res.redirect('/admin/editProdutos')
  }).catch((err) => {
    req.flash('error_msg', 'Houve um erro ao deletar produto' + err)
    res.redirect('/admin/editProdutos')
  })
})

//editar produtos
//exibição formulario
router.get('/produtos/editar/:id', eAdmin.eAdmin, (req, res) => {
  Produtos.findOne({ where: { id: req.params.id } }).then((produto) => {
    res.render('admin/formEditProdutos', { produto })
  })
})
//funcção de editar
router.post('/produtos/editar/:id', eAdmin.eAdmin, (req, res) => {
  //validar edicoes
  //a validar ainda
  const erros = [];

  if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
    erros.push({ texto: 'Produto precisa ter um nome' })
  }

  if (!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null) {
    erros.push({ texto: 'Slug não pode estar vazio' })
  }

  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  if (!slugRegex.test(req.body.slug)) {
    erros.push({ texto: 'Slug não deve conter caracteres especiais nem maiusculas' })
  }

  if (!req.body.detalhes || typeof req.body.detalhes == undefined || req.body.detalhes == null) {
    erros.push({ texto: 'Detalhes não pode estar vazio' })
  }

  if (req.body.detalhes.length <= 30) {
    erros.push({ texto: 'Adicione mais informações á "detalhes"' })
  }

  if (!req.body.preco || typeof req.body.preco == undefined || req.body.preco == null) {
    erros.push({ texto: 'Preço invalido' })
  }

  if (!req.body.estoque || typeof req.body.estoque == undefined || req.body.estoque == null) {
    erros.push({ texto: 'Estoque invalido' })
  }

  if (!req.body.img || typeof req.body.img !== 'string' || req.body.img == null || req.body.img.trim() === '') {
    erros.push({ texto: 'Link da imagem invalido' })
  }
  
  if(erros.length === 0){

  Produtos.findOne({ where: { id: req.params.id } }).then((produto) => {
    produto.update({
      nome: req.body.nome,
      slug: req.body.slug,
      detalhes: req.body.detalhes,
      preco: req.body.preco,
      estoque: req.body.estoque,
      imagem: req.body.img
    }).then(() => {
      req.flash('success_msg', `Produto com ID numero ${req.params.id} Foi editado com sucesso`)
      res.redirect('/admin/editProdutos')
    }).catch((err) => {
      req.flash('error_msg', 'houve um erro ao atualizar produto' + err)
      res.redirect('/admin/editProdutos')
    })
  }).catch((err) => {
    console.log('erro ao encontrar produto')
  })}else{
    res.render('admin/formEditProdutos', {erros : erros})
  }
  
  
})











export default router;