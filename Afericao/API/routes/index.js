var express = require('express');
var router = express.Router();
var Exame = require('../controllers/exame')

// GET /api/emd - Devolve a lista de EMD apenas com os campos "id", "nome", "data" e "resultado";
// GET /api/emd/:id - Devolve a informação completa de um EMD;
// GET /api/modalidades - Devolve a lista de modalidades, sem repetições;
// GET /api/emd?res=OK - Devolve a lista de EMD com resultado "true";
// GET /api/emd?modalidade=X - Devolve a lista de EMD referentes à modalidade passada como
// parâmetro, X;
// GET /api/atletas?gen=F - Devolve uma lista ordenada alfabeticamente com os nomes dos
// atletas de género feminino;
// GET /api/atletas?clube=X - Devolve uma lista ordenada alfabeticamente com os nomes dos
// atletas do clube X.

//
router.get('/api/emd', function (req, res, next) {
    if(Object.keys(req.query).length > 0){
        if(req.query.modalidade){
            Exame.listByModalidade(req.query.modalidade)
            .then((result) => {
                res.jsonp(result);
            }).catch((err) => {
                res.jsonp(err);
            });
        }else if(req.query.res && req.query.res == "OK"){
            Exame.resOK()
            .then((result) => {
                res.jsonp(result);
            }).catch((err) => {
                res.jsonp(err);
            });
        }
    }else{
        Exame.list()
        .then((result) => {
            res.jsonp(result);
        }).catch((err) => {
            res.jsonp(err);
        });
    }
});

//
router.get('/api/emd/:id', function (req, res, next) {
    Exame.getExame(req.params.id)
    .then((result) => {
        res.jsonp(result);
    }).catch((err) => {
        res.jsonp(err);
    });
})

// 
router.get('/api/modalidades', function (req, res, next) {
    Exame.modalidades()
    .then((result) => {
        res.jsonp(result);
    }).catch((err) => {
        res.jsonp(err);
    });
})

router.get('/api/atletas', function (req, res, next) {
    if(Object.keys(req.query).length > 0){
        if(req.query.gen && req.query.gen == 'F'){
            Exame.listGenF()
            .then((result) => {
                res.jsonp(result);
            }).catch((err) => {
                res.jsonp(err);
            });
        }else if (req.query.clube){
            Exame.listAthletesByClub(req.query.clube)
            .then((result) => {
                res.jsonp(result);
            }).catch((err) => {
                res.jsonp(err);
            });
        }
    }else{
        res.send("<pre>Erro: A rota /api/atletas não pode estar vazia</pre>")
    }
})

module.exports = router;
