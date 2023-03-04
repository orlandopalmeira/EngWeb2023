const http  = require('http');
const fs    = require('fs');
const axios = require('axios');
const pages = require('./pages');
/*
Pedidos possíveis ao servidor:
    / -> Página inicial (DONE!)
    /pessoas -> lista de pessoas pela ordem em que constam no ficheiro (DONE!)
    /pessoasAsc -> lista de pessoas ordenadas pelo nome de forma ascendente (DONE!)
    /pessoasDesc -> lista de pessoas ordenadas pelo nome de forma descendente (DONE!)
    /pessoas/px -> Página com as informações de uma pessoa (!DONE)
    /sexo -> página com tabela que indica o número de pessoas em cada sexo (DONE!)
        /sexo/x -> página onde são apresentadas as pessoas do sexo x (DONE!)
    /desporto -> página com tabela que indica o número de pessoas em cada desporto (DONE!)
        /desporto/x -> página onde são apresentadas as pessoas do desporto x (DONE!)
    /profissao -> página onde é apresentado o top 10 de profissões (DONE!)
        /profissao/x -> página onde são apresentadas as pessoas da profissão x (DONE!)
*/
http.createServer((req, res) => {
    let d = new Date().toISOString().substring(0,16);
    console.log(`${d} ${req.method} ${req.url}`)
    const regexCSS = new RegExp(/(?:\/.+)*\/w3\.css$/) // expressão regular para detectar a w3.css
    const regexGender = new RegExp(/^\/sexo\/(\w+)$/) // expressão regular para detectar pedidos sobre um certo sexo
    const regexSport = new RegExp(/^\/desporto\/(.+)$/) // expressão regular para detectar pedidos sobre um certo desporto
    const regexJob = new RegExp(/^\/profissao\/(.+)$/) // expressão regular para detectar pedidos sobre uma certa profissão
    const regexPerson = new RegExp(/^\/pessoas\/(p\d+)$/)

    if(req.method == 'GET'){
        req.url = decodeURIComponent(req.url) // por causa da acentuação
        if(regexCSS.test(req.url)){ // stylesheet
            pages.sendStyleSheet('w3.css',res)
        } else if(req.url == '/'){
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end(pages.initPage())
        } else if(req.url == '/pessoas'){ 
            axios.get('http://localhost:3000/pessoas')
                .then(function (resp) { // correu tudo bem
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                    let pessoas = resp.data // lista de objetos/dicionarios
                    res.end(pages.peoplePage(pessoas))
                }).catch(erro => { // algo correu mal
                    res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'});
                    res.end(`<h1 align="center">500 Error: ${erro}</h1>`)
                    console.log(`${new Date().toISOString().substring(0,16)} 500 Error: ${erro}`)
                });
        } else if(req.url == '/pessoasAsc'){
            axios.get('http://localhost:3000/pessoas')
                .then(function (resp) { // correu tudo bem
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                    let pessoas = resp.data // lista de objetos/dicionarios
                    let pessoasAsc = pessoas.sort((p1,p2) => p1.nome.localeCompare(p2.nome))
                    res.end(pages.peoplePage(pessoasAsc))
                }).catch(erro => { // algo correu mal
                    res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'});
                    res.end(`<h1 align="center">500 Error: ${erro}</h1>`)
                    console.log(`${new Date().toISOString().substring(0,16)} 500 Error: ${erro}`)
                });
        } else if(req.url == '/pessoasDesc'){
            axios.get('http://localhost:3000/pessoas')
                .then(function (resp) { // correu tudo bem
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                    let pessoas = resp.data // lista de objetos/dicionarios
                    let pessoasDesc = pessoas.sort((p1,p2) => -p1.nome.localeCompare(p2.nome))
                    res.end(pages.peoplePage(pessoasDesc))
                }).catch(erro => { // algo correu mal
                    res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'});
                    res.end(`<h1 align="center">500 Error: ${erro}</h1>`)
                    console.log(`${new Date().toISOString().substring(0,16)} 500 Error: ${erro}`)
                });
        } else if(regexPerson.test(req.url)){
            let pID = regexPerson.exec(req.url)[1]
            axios.get('http://localhost:3000/pessoas')
                .then(function (resp) { // correu tudo bem
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                    let pessoas = resp.data // lista de objetos/dicionarios
                    res.end(pages.personPage(pID,pessoas))
                }).catch(erro => { // algo correu mal
                    res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'});
                    res.end(`<h1 align="center">500 Error: ${erro}</h1>`)
                    console.log(`${new Date().toISOString().substring(0,16)} 500 Error: ${erro}`)
                });
        } else if(req.url == '/sexo'){
            axios.get('http://localhost:3000/pessoas')
                .then(function (resp) { // correu tudo bem
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                    let pessoas = resp.data // lista de objetos/dicionarios
                    res.end(pages.gendersPage(pessoas))
                }).catch(erro => { // algo correu mal
                    res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'});
                    res.end(`<h1 align="center">500 Error: ${erro}</h1>`)
                    console.log(`${new Date().toISOString().substring(0,16)} 500 Error: ${erro}`)
                });
        } else if(regexGender.test(req.url)){
            let gender = regexGender.exec(req.url)[1]
            axios.get('http://localhost:3000/pessoas')
                .then(function (resp) { // correu tudo bem
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                    let pessoas = resp.data // lista de objetos/dicionarios
                    res.end(pages.genderPage(gender,pessoas))
                }).catch(erro => { // algo correu mal
                    res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'});
                    res.end(`<h1 align="center">500 Error: ${erro}</h1>`)
                    console.log(`${new Date().toISOString().substring(0,16)} 500 Error: ${erro}`)
                });
            
        } else if(req.url == '/desporto'){
            axios.get('http://localhost:3000/pessoas')
                .then(function (resp) { // correu tudo bem
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                    let pessoas = resp.data // lista de objetos/dicionarios
                    res.end(pages.sportsPage(pessoas))
                }).catch(erro => { // algo correu mal
                    res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'});
                    res.end(`<h1 align="center">500 Error: ${erro}</h1>`)
                    console.log(`${new Date().toISOString().substring(0,16)} 500 Error: ${erro}`)
                });
        } else if(regexSport.test(req.url)) {
            let sport = regexSport.exec(req.url)[1]
            axios.get('http://localhost:3000/pessoas')
                .then(function (resp) { // correu tudo bem
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                    let pessoas = resp.data // lista de objetos/dicionarios
                    res.end(pages.sportPage(sport,pessoas))
                }).catch(erro => { // algo correu mal
                    res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'});
                    res.end(`<h1 align="center">500 Error: ${erro}</h1>`)
                    console.log(`${new Date().toISOString().substring(0,16)} 500 Error: ${erro}`)
                });
        } else if(req.url == '/profissao'){
            axios.get('http://localhost:3000/pessoas')
                .then(function (resp) { // correu tudo bem
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                    let pessoas = resp.data // lista de objetos/dicionarios
                    res.end(pages.jobsPage(pessoas))
                }).catch(erro => { // algo correu mal
                    res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'});
                    res.end(`<h1 align="center">500 Error: ${erro}</h1>`)
                    console.log(`${new Date().toISOString().substring(0,16)} 500 Error: ${erro}`)
                });
        } else if(regexJob.test(req.url)){
            let job = regexJob.exec(req.url)[1]
            axios.get('http://localhost:3000/pessoas')
                .then(function (resp) { // correu tudo bem
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                    let pessoas = resp.data // lista de objetos/dicionarios
                    res.end(pages.jobPage(job,pessoas))
                }).catch(erro => { // algo correu mal
                    res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'});
                    res.end(`<h1 align="center">500 Error: ${erro}</h1>`)
                    console.log(`${new Date().toISOString().substring(0,16)} 500 Error: ${erro}`)
                });
        } else { // recurso inexistente
            console.log(`${new Date().toISOString().substring(0,16)} 404 Not Found`)
            res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
            res.end('<h1 align="center">404 Not Found</h1>')
        }
    }

}).listen(7777)

console.log(`${new Date().toISOString().substring(0,16)} Server has started at port 7777`)