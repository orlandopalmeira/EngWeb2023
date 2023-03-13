const http = require('http');
const fs = require('fs');
const axios = require('axios');
const pages = require('./pages')
const {collectRequestBodyData, getTasks, getUsers}  = require('./getdata');

function getHandler(req, res, callback){
    if(req.url =='/'){
        getTasks(tasks => {
            if(tasks){
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.end(pages.initPage(tasks.not_finished, tasks.finished));
                callback(null)
            }else{
                res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<h1> 500 [GETHANDLER] Erro a obter as tarefas</h1>')
                callback({code: 500, message: "[GETHANDLER] Erro a obter as tarefas"})
            }
        })
    } else if(/.*\/w3\.css$/.test(req.url)){
        fs.readFile('w3.css',(err,data) => {
            if(err){
                res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(`<h1> 500 [GETHANDLER] Erro a ler o w3.css (${err})</h1>`)
                callback({code: 500, message: `[GETHANDLER] Erro a ler o w3.css (${err})`})
            }else{
                res.writeHead(200, {'Content-Type': 'text/css; charset=utf-8'});
                res.end(data);
                callback(null)
            }
        })
    } else {
        res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
        res.end(`<h1>500 [GETHANDLER] Rota '${req.url}' desconhecida </h1>`);
        callback({code: 404, message: `404 [GETHANDLER] Rota '${req.url}' desconhecida`})
    }
}

function postHandler(req, res, callback) {
    if(req.url == '/'){
        collectRequestBodyData(req, result => {
            if(result){
                switch (result._method) {
                case '_post_task':{
                    result.finished = result.finished == 'true' ? true : false
                    getUsers(users => {
                    if(users){
                        axios.post('http://localhost:3000/tasks/' , {
                            due_date: result.due_date,
                            who: users.filter(user => user.name == result.who)[0].id,
                            what: result.what,
                            finished: result.finished
                        })
                        .then(resp => {
                            getTasks(tasks => {
                                if(tasks){
                                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                                    res.end(pages.initPage(tasks.not_finished, tasks.finished));
                                    callback(null)
                                }else{
                                    res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                                    res.end('<h1> 500 [POSTHANDLER] Erro a recarregar a página</h1>')
                                    callback({code: 500, message: "[POSTHANDLER] Erro a recarregar a página"})
                                }
                            })
                        })
                        .catch(error => {
                            res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'})
                            res.end(`<h1> 500 [POSTHANDLER] Erro a inserir a nova tarefa (${error})</h1>`)
                            callback({code: 500, message:`500 [POSTHANDLER] Erro a inserir a nova tarefa (${error})`})
                        })
                    }else{
                        res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                        res.end('<h1> 500 [POSTHANDLER] Erro a obter os utilizadores</h1>')
                        callback({code: 500, message: "[POSTHANDLER] Erro a obter os utilizadores"})
                    }
                    })
                    break;
                }

                case '_post_user':{
                    result.finished = result.finished == 'true' ? true : false
                    axios.post('http://localhost:3000/users/' , {
                        name: result.name
                    })
                    .then(resp => {
                        getTasks(tasks => {
                            if(tasks){
                                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                                res.end(pages.initPage(tasks.not_finished, tasks.finished));
                                callback(null)
                            }else{
                                res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                                res.end('<h1> 500 [POSTHANDLER] Erro a recarregar a página</h1>')
                                callback({code: 500, message: "[POSTHANDLER] Erro a recarregar a página"})
                            }
                        })
                    })
                    .catch(error => {
                        res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'})
                        res.end(`<h1> 500 [POSTHANDLER] Erro a inserir o novo utilizador (${error})</h1>`)
                        callback({code: 500, message:`500 [POSTHANDLER] Erro a inserir o novo utilizador (${error})`})
                    })
                    break;
                }

                case '_put_task':{
                    result.finished = result.finished == 'true' ? true : false
                    getUsers(users => {
                        if(users){
                            axios.put('http://localhost:3000/tasks/' + result.id, {
                                due_date: result.due_date,
                                who: users.filter(user => user.name == result.who)[0].id,
                                what: result.what,
                                finished: result.pressedButton == 'concluida' ? true : result.finished
                            }).then(resp => {
                                getTasks(tasks => {
                                    if(tasks){
                                        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                                        res.end(pages.initPage(tasks.not_finished, tasks.finished));
                                        callback(null)
                                    }else{
                                        res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                                        res.end('<h1> 500 [POSTHANDLER] Erro a recarregar a página</h1>')
                                        callback({code: 500, message: "[POSTHANDLER] Erro a recarregar a página"})
                                    }
                                })
                            }).catch(error => {
                                res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'})
                                res.end(`<h1> 500 [POSTHANDLER] Erro a editar a tarefa (${error})</h1>`)
                                callback({code: 500, message:`500 [POSTHANDLER] Erro a editar a tarefa (${error})`})
                            })
                        }else{
                            res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                            res.end('<h1> 500 [POSTHANDLER] Erro a obter os utilizadores</h1>')
                            callback({code: 500, message: "[POSTHANDLER] Erro a obter os utilizadores"})
                        }
                    })
                    break;
                }
            
                default:
                    break;
                }
            }else{
                res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'})
                res.end('<h1> 500 [POSTHANDLER] Erro a processar a nova tarefa</h1>')
                callback({code: 500, message: "[POSTHANDLER] Erro a processar a nova tarefa"})
            }
        })
        callback(null)
    } else {
        res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
        res.end('<h1> 500 [POSTHANDLER] Post oriundo de uma rota desconhecida</h1>')
        callback({code: 404, message: "404 [POSTHANDLER] Post oriundo de uma rota desconhecida"})
    }
}



http.createServer((req, res) => {
    //console.log('[DEBUG] ' + req.method) 
    switch (req.method) {
    case 'GET':{
        getHandler(req, res, error => {
            if(error){
                console.log(`${new Date().toISOString().substring(0,16)} ${req.method} ${req.url} ${error.code} ${error.message}`)
            }else{
                console.log(`${new Date().toISOString().substring(0,16)} ${req.method} ${req.url}`)
            }
        })
        break;
    }

    case 'POST':{
        postHandler(req, res, error => {
            if(error){
                console.log(`${new Date().toISOString().substring(0,16)} ${req.method} ${req.url} ${error.code} ${error.message}`)
            }else{
                console.log(`${new Date().toISOString().substring(0,16)} ${req.method} ${req.url}`)
            }
        })
        break;
    }

    default:{
        res.writeHead(403, {'Content-Type': 'text/html; charset=utf-8'});
        res.end(`<h1 align="center">403: method ${req.method} Forbidden</h1>`)
        console.log(`${new Date().toISOString().substring(0,16)} 403: method ${req.method} Forbidden`)
        break;
    }
    }
}).listen(7777)

console.log(`${new Date().toISOString().substring(0,16)} Server has started at port 7777`)
