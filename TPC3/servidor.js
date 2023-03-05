const http  = require('http');
const fs    = require('fs');
const url   = require('url');
const axios = require('axios');
const pages = require('./pages');

/*
Pedidos possíveis ao servidor:
/ -> Página inicial
/pessoas -> lista de pessoas pela ordem em que constam no ficheiro 
/pessoas?order=asc -> lista de pessoas ordenadas pelo nome de forma ascendente 
/pessoas?order=desc -> lista de pessoas ordenadas pelo nome de forma descendente
/pessoas?id=px -> -> Página com as informações de uma pessoa

/sexo -> página com tabela que indica o número de pessoas em cada sexo 
/pessoas?sexo=x -> página onde são apresentadas as pessoas do sexo x

/desporto -> página com tabela que indica o número de pessoas em cada desporto 
/pessoas?desporto=x -> página onde são apresentadas as pessoas do desporto x

/profissao -> página onde é apresentado o top 10 de profissões
/pessoas?profissão=x -> página onde são apresentadas as pessoas da profissão x
*/

http.createServer((req, res) => {
    const regexQuery = new RegExp(/^\/pessoas\?(?:.+)$/)

    let d = new Date().toISOString().substring(0,16);
    console.log(`${d} ${req.method} ${req.url}`)
    //req.url = decodeURIComponent(req.url) // por causa da acentuação
    let urlParse = url.parse(req.url, true)
    let query = urlParse.query
    
    if(req.method == 'GET'){
        if(req.url == '/w3.css'){
            pages.sendStyleSheet('w3.css',res)
        } else if(req.url == '/'){
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end(pages.initPage())
        } else if(req.url == '/pessoas'){ 
            axios.get('http://localhost:3000/pessoas')
                .then(function (resp) { // correu tudo bem
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                    res.end(pages.peoplePage(resp.data))
                }).catch(erro => { // algo correu mal
                    res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'});
                    res.end(`<h1 align="center">500 Error: ${erro}</h1>`)
                    console.log(`${new Date().toISOString().substring(0,16)} 500 Error: ${erro}`)
                });
        } else if(req.url == '/sexo'){
            axios.get('http://localhost:3000/pessoas')
                .then(function (resp) { // correu tudo bem
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                    res.end(pages.gendersPage(resp.data))
                }).catch(erro => { // algo correu mal
                    res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'});
                    res.end(`<h1 align="center">500 Error: ${erro}</h1>`)
                    console.log(`${new Date().toISOString().substring(0,16)} 500 Error: ${erro}`)
                });
        } else if(req.url == '/desporto'){
            axios.get('http://localhost:3000/pessoas')
                .then(function (resp) { // correu tudo bem
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                    res.end(pages.sportsPage(resp.data))
                }).catch(erro => { // algo correu mal
                    res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'});
                    res.end(`<h1 align="center">500 Error: ${erro}</h1>`)
                    console.log(`${new Date().toISOString().substring(0,16)} 500 Error: ${erro}`)
                });
        } else if(req.url == '/profissao'){
            axios.get('http://localhost:3000/pessoas')
                .then(function (resp) { // correu tudo bem
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                    res.end(pages.jobsPage(resp.data))
                }).catch(erro => { // algo correu mal
                    res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'});
                    res.end(`<h1 align="center">500 Error: ${erro}</h1>`)
                    console.log(`${new Date().toISOString().substring(0,16)} 500 Error: ${erro}`)
                });
        } else if(regexQuery.test(req.url)){
            let parameter = Object.keys(query)[0]
            switch (parameter) {
                case 'order':{
                    axios.get('http://localhost:3000/pessoas')
                        .then((resp) => { // correu tudo bem
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                            let pessoasAsc = (resp.data).sort((p1,p2) => (query.order == 'desc' ? -1 : 1)*p1.nome.localeCompare(p2.nome))
                            res.end(pages.peoplePage(pessoasAsc))
                        }).catch(erro => { // algo correu mal
                            res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'});
                            res.end(`<h1 align="center">500 Error: ${erro}</h1>`)
                            console.log(`${new Date().toISOString().substring(0,16)} 500 Error: ${erro}`)
                        });
                    break;
                }

                case 'sexo':{
                    axios.get('http://localhost:3000/pessoas')
                        .then(function (resp) { // correu tudo bem
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                            res.end(pages.genderPage(query.sexo,resp.data))
                        }).catch(erro => { // algo correu mal
                            res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'});
                            res.end(`<h1 align="center">500 Error: ${erro}</h1>`)
                            console.log(`${new Date().toISOString().substring(0,16)} 500 Error: ${erro}`)
                        });
                    break;
                }

                case 'desporto':{
                    axios.get('http://localhost:3000/pessoas')
                        .then(function (resp) { // correu tudo bem
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                            res.end(pages.sportPage(query.desporto,resp.data))
                        }).catch(erro => { // algo correu mal
                            res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'});
                            res.end(`<h1 align="center">500 Error: ${erro}</h1>`)
                            console.log(`${new Date().toISOString().substring(0,16)} 500 Error: ${erro}`)
                        });
                    break;
                }

                case 'profissao':{
                    axios.get('http://localhost:3000/pessoas')
                        .then(function (resp) { // correu tudo bem
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                            res.end(pages.jobPage(query.profissao,resp.data))
                        }).catch(erro => { // algo correu mal
                            res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'});
                            res.end(`<h1 align="center">500 Error: ${erro}</h1>`)
                            console.log(`${new Date().toISOString().substring(0,16)} 500 Error: ${erro}`)
                        });
                    break;
                }

                case 'id':{
                    axios.get('http://localhost:3000/pessoas')
                        .then(function (resp) { // correu tudo bem
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                            res.end(pages.personPage(query.id,resp.data))
                        }).catch(erro => { // algo correu mal
                            res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'});
                            res.end(`<h1 align="center">500 Error: ${erro}</h1>`)
                            console.log(`${new Date().toISOString().substring(0,16)} 500 Error: ${erro}`)
                        });
                    break;
                }

                default:{
                    res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'});
                    res.end(`<h1 align="center">404 Not Found</h1>`)
                    console.log(`${new Date().toISOString().substring(0,16)} 404 Not Found`)
                    break;
                }
            }
        } else{
            res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'});
                res.end(`<h1 align="center">404 Not Found</h1>`)
                console.log(`${new Date().toISOString().substring(0,16)} 404 Not Found`)
        }
    }
}).listen(7777)

console.log(`${new Date().toISOString().substring(0,16)} Server has started at port 7777`)