var express = require('express');
var router = express.Router();
const Aluno = require('../controllers/aluno')

/* GET home page. */
router.get('/', function(req, res, next) {
  let data = new Date().toISOString().substring(0, 16)
  Aluno.list()
  .then(alunos => {
    res.render('index', { slist: alunos, d: data }); // recebe a template e a estrutura de dados a fornecer à template. Pega na template, cria a página, preenche-a e envia-a
  })
  .catch(erro => {
    res.render('error', {error: erro, message:"Erro na obtenção da lista de alunos"})
  })
  
});

/* GET studen page. */
router.get('/alunos/:idAluno', function(req, res, next) {
  let data = new Date().toISOString().substring(0, 16)
  Aluno.getAluno(req.params.idAluno)
  .then(aluno => {
    res.render('aluno', { a: aluno , d: data }); // recebe a template e a estrutura de dados a fornecer à template. Pega na template, cria a página, preenche-a e envia-a
  })
  .catch(erro => {
    res.render('error', {error: erro, message:"Erro na obtenção do registo do aluno"})
  })
  
});

module.exports = router;
