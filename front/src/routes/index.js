var express = require('express');
var router = express.Router();
const loginController = require('../controllers/login');
const indexController = require('../controllers/index');

module.exports = app => {

  const urlBackImage = "http://localhost:3001/images/";

  /* GET home page. */
  router.get('/', async (req, res, next) => {
    const response = await indexController.getHouses();
    const data = [...response.data.docs.promotions, ...response.data.docs.new, ...response.data.docs.remaining ];
        response.data.docs = data;
        response.data.url_back = urlBackImage;

        console.log(response.data);


    res.render('index', { logged: true, admin: false, ...response });
  });

  router.get('/informacoes/:id', async (req, res, next) => {

    const response = await indexController.getHouse(req.params.id);

    console.log(response.data);

    res.render('pages/informations', { logged: false, admin: false, url_back: urlBackImage, data: { ...response.data } });
  });

  router.get('/cadastro', async (req, res, next) => {
    res.render('pages/register', { login: false, admin: false });
  });

  router.get('/login', async (req, res, next) => {
    res.render('pages/register', { login: true, admin: false, status: 200, error: false });
  })
  router.post('/login', async (req, res, next) => {
    const response = await loginController.SendLogin(req.body.email, req.body.password);

    console.log(response);

    if(!response.error)
      return res.redirect("/");

    return res.render('pages/register', {
        login: true,
        admin: false,
          ...response
    });

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
