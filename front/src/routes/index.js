var express = require("express");
var router = express.Router();
const loginController = require("../controllers/login");
const indexController = require("../controllers/index");
const contactController = require("../controllers/contact");
const storage = require("node-persist");

module.exports = app => {
  const urlBackImage = "http://localhost:3001/images/";

  /* GET home page. */
  router.get("/", async (req, res, next) => {
    await storage.init();
    const response = await indexController.getHouses();
    const data = [
      ...response.data.docs.promotions,
      ...response.data.docs.new,
      ...response.data.docs.remaining
    ];
    let token = {};
    if (await storage.getItem("token")) {
      token = {
        logged: true,
        admin: true,
        token: await storage.getItem("token")
      };
    } else {
      token = {
        logged: false,
        admin: false,
        token: ""
      };
    }

    response.data.docs = data;
    response.data.url_back = urlBackImage;
    res.render("index", {
      ...response,
      ...token
    });
  });

  router.get("/informacoes/:id", async (req, res, next) => {
    const response = await indexController.getHouse(req.params.id);

    res.render("pages/informations", {
      logged: false,
      admin: false,
      url_back: urlBackImage,
      data: { ...response.data }
    });
  });

  router.get("/cadastro", async (req, res, next) => {
    res.render("pages/register", { login: false, admin: false });
  });

  router.get("/login", async (req, res, next) => {
    res.render("pages/register", {
      login: true,
      admin: false,
      status: 200,
      error: false,
      token: ""
    });
  });
  router.post("/login", async (req, res, next) => {
    await storage.init();

    const response = await loginController.SendLogin(
      req.body.email,
      req.body.password
    );

    console.log(response.data.token);
    await storage.setItem("token", response.data.token);
    if (!response.error) return res.redirect("/");

    return res.render("pages/register", {
      login: true,
      admin: false,
      ...response,
      token: ""
    });
  });

  router.get("/editor", async (req, res, next) => {
    res.render("pages/editor", { logged: true, admin: true });
  });

  router.get("/dashboard", async (req, res, next) => {
    res.render("pages/dashboard", { logged: true, admin: true });
  });

  router.get("/perfil", async (req, res, next) => {
    res.render("pages/perfil", { logged: true, admin: false });
  });

  router.get("/propostas", async (req, res, next) => {
    res.render("pages/propostas", { logged: true, admin: false });
  });

  router.post("/cad-infos", async (req, res, next) => {
    console.log(req.body);

    let contact = await contactController.sendContact(
      req.body.nome,
      req.body.telefone,
      req.body.id,
      req.body.codigo,
      req.body.descricao
    );
    res.json(contact);
  });

  app.use(router);
};
