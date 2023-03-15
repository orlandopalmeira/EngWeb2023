var express = require('express');
var router = express.Router();
const Task = require('../controllers/task')
const User = require('../controllers/user')

/* GET home page. */
router.get('/', function (req, res, next){
    Task.getTasks()
        .then(tasks => {
            res.render('index', tasks)
        }).catch(erro => {
            res.render('error',{error: erro, message: "Erro na obtenção da lista de tarefas"})
        });
})

/* POST Handler*/
router.post('/', function(req,res,next){
    if(req.body._method == '_post_task'){
        Task.addTask({due_date: req.body.due_date,
                      who: req.body.who,
                      what: req.body.what,
                      finished: 'false'})
            .then(result => {
                res.redirect('/')
            }).catch(erro => {
                res.render('error',{ error: erro, message: "Erro na inserção da nova tarefa" })
            });
    }else if (req.body._method == '_post_user') {
        User.addUser({id: req.body.id})
            .then(result => {
                res.redirect('/')
            }).catch(erro => {
                res.render('error',{ error: erro, message: "Erro na inserção do novo utilizador" })
            });
    }else if(req.body._method == '_put_task'){
        let finished_ = req.body.finished
        if(req.body.pressedButton == 'concluida'){
            finished_ = 'true'
        }else if(req.body.pressedButton == 'nao_concluida'){
            finished_ = 'false'
        }
        Task.editTask({
            id: req.body.id,
            due_date: req.body.due_date,
            who: req.body.who,
            what: req.body.what,
            finished: finished_
        }).then(resp => {
            res.redirect('/')
        }).catch(erro => {
            res.render('error',{ error: erro, message: "Erro na alteração da tarefa" })
        })
    } else{
        res.render('myerror',{message: `O método de formulário ${req.body._method} é desconhecido`})
    }
})

/* DELETE Task handler */
router.get('/tasks/deleteConfirm/:idTask', function(req,res,next){
    Task.deleteTask(req.params.idTask)
    .then(result => {
        res.redirect('/')
    }).catch(erro => {
        res.render('error',{ error: erro, message: "Erro na remoção da tarefa" })
    });
})

module.exports = router;
