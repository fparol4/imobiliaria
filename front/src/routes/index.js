var express = require('express');
var router = express.Router();
const controller = require('../controllers');

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
    res.render('pages/register', { login: true, admin: false });
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