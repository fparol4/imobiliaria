var express = require('express');
var router = express.Router();
const controller = require('../controllers');
const loginController = require('../controllers/login');

module.exports = app => {

  /* GET home page. */
  router.get('/', async (req, res, next) => {
    res.render('index', { logged: true, admin: true });
  });

  router.get('/informacoes', async (req, res, next) => {
    res.render('pages/informations', { logged: false, admin: false });
  });

  router.get('/cadastro', async (req, res, next) => {
    res.render('pages/register', { login: false, admin: false });
  });

  router.get('/login', async (req, res, next) => {
    res.render('pages/register', { login: true, admin: false, status: 200 });
  })
  router.post('/login', async (req, res, next) => {
  const response = await loginController.SendLogin(req.body.email, req.body.password);
    if(response.status == 400){
       return res.render('pages/register', {
    login: true,
    admin: false,
      ...response
    });
    }

    res.redirect("/");

  });

  router.get('/editor', async (req, res, next) => {
    res.render('pages/editor', { logged: true, admin: true });
  });

    router.get('/dashboard', async (req, res, next) => {
    res.render('pages/dashboard', {logged: true, admin: true });
  });

    router.get('/perfil', async (req, res, next) => {
    res.render('pages/perfil', {logged: true, admin: false });
  });

      router.get('/propostas', async (req, res, next) => {
    res.render('pages/propostas', {logged: true, admin: false });
  });

  app.use(router);
}
