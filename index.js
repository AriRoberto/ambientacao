const express = require("express");

const handlebars = require('express-handlebars');

const app = express();
const hbs = handlebars.create({ /* config */ })

const listarSistemasService = require("./src/service/ListarSistemas");

// Config
  // Template Engine
  app.engine('handlebars', hbs.engine);
  app.set('view engine', 'handlebars');
  app.set('views', './views');
  app.use(express.static('public')); 

app.get("/", function(req, res){
  console.log("rota home")
  res.render('home');
});

app.get("/introducao", function(req, res){
  console.log("rota introdução")
  res.render('introducao');
});

app.get("/permissoes", function(req, res){
  console.log("rota permissoes")
  res.render('permissoes');
});

app.get("/areassistemas", async function(req, res){
  console.log("rota area sitemas")
  let lista = await listarSistemasService().execute();
  res.render('areassistemas', {sistemas: lista });
});

app.get("/admlocal", function(req, res){
  console.log("rota adm local")
  res.render('admlocal');
});

app.get("/ative", function(req, res){
  console.log("rota ative")
  res.render('ative')
});

app.get("/autobots", function(req, res){
  console.log("rota autobots")
  res.render('autobots');
});

app.get("/argo", function(req, res){
  console.log("rota argo")
  res.render('argo');
});

app.get("/git", function(req, res){
  console.log("rota git")
  res.render('git');
});

app.get("/jenkins", function(req, res){
  console.log("rota jenkins")
  res.render('jenkins');
});

app.get("/banco", function(req, res){
  console.log("rota banco")
  res.render('banco');
});

app.get("/otrs", function(req, res){
  console.log("rota otrs")
  res.render('otrs');
});

app.get("/rancher", function(req, res){
  console.log("rota rancher")
  res.render('rancher');
});

app.get("/kubernetes", function(req, res){
  console.log("rota Kubernetes")
  res.render('kubernetes');
});

app.get("/docker", function(req, res){
  console.log("rota docker")
  res.render('docker');
});

app.get("/redmine", function(req, res){
  console.log("rota redmine")
  res.render('redmine');
});

app.get("/sonar", function(req, res){
  console.log("rota sonar")
  res.render('sonar');
});

app.get("/idean", function(req, res){
  console.log("rota idean")
  res.render('idean');
});

app.get("/links", function(req, res){
  console.log("rota links")
  res.render('links');
});

app.listen(3000, function(){
  console.log("Servidor Rodanto com Sucessso. Url: http://localhost:3000")
}); 
