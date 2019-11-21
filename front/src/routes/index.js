var express = require('express');
var router = express.Router();
const controller = require('../controllers');

module.exports = app => {

  /* GET home page. */
  router.get('/', async (req, res, next) => {
    res.render('index');
  });

  router.get('/informacoes', async (req, res, next) => {
    res.render('pages/informations');
  });

  router.get('/cadastro', async (req, res, next) => {
    res.render('pages/register', { login: false });
  });

  router.get('/login', async (req, res, next) => {
    res.render('pages/register', { login: true });
  });

  router.get('/editor', async (req, res, next) => {
    res.render('pages/editor');
  });

    router.get('/dashboard', async (req, res, next) => {
    res.render('pages/dashboard');
  });

  app.use(router);
}