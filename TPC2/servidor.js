var http = require('http');
var fs = require('fs');

var port = 7777

http.createServer(function (req, res) {
    var d = new Date().toISOString().substring(0,16);
    console.log(`${d} ${req.method} ${req.url}`)
    var regex = new RegExp(/^\/c\d+$/) // para verificar se uma URL corresponde ao id de uma cidade

    if (req.method === 'GET') { // neste contexto, só aceitamos métodos GET
        if(req.url === '/') {
            fs.readFile('index.html', function (err, data) { // lê o index.html e envia o seu conteudo ao cliente
                if(err){ // se ocorrerem erros, o servidor informa o cliente dessa ocorrência
                    console.log(`${new Date().toISOString().substring(0,16)} 500 500 Error reading index.html`)
                    res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'});
                    res.write('<h1 align="center">500 Error reading index.html</h1>');
                } else{ // se correr tudo bem, o servidor envia o conteudo do index.html ao cliente
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                    res.write(data);
                }
                res.end();
            });
        }else if(regex.test(req.url)){
            fs.access(`./pages/${req.url.substring(1)}.html`, fs.F_OK, (err) => {
                if (err) { // se o ficheiro cx.html não existir
                    console.log(`${new Date().toISOString().substring(0,16)} 404 ${req.url} not found`)
                    res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
                    res.write('<h1 align="center">404 Resource not found</h1>');
                    res.end()
                } else { // cx.html existe
                    fs.readFile(`./pages/${req.url.substring(1)}.html`, function (err, data) { //lê o cx.html e envia o seu conteudo ao cliente
                        if(err){ // se ocorrerem erros, o servidor informa o cliente dessa ocorrência
                            console.log(`${new Date().toISOString().substring(0,16)} 500 Error reading ${req.url.substring(1)}.html`)
                            res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'});
                            res.write(`<h1 align="center">500 Error reading ${req.url.substring(1)}.html</h1>`);
                        } else{ // se correr tudo bem, o servidor envia o conteudo do cx.html ao cliente
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                            res.write(data);
                        }
                        res.end();
                    });
                }
            });
        }else{ // caso o pedido do cliente não esteja dentro do esperado, este servidor informa o cliente dessa ocorrência
            console.log(`${new Date().toISOString().substring(0,16)} 404 ${req.url} not found`)
            res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'}); 
            res.write('<h1 align="center">404 Resource not found</h1>');
            res.end()
        }
    }else{ // caso o método não seja GET, informa o cliente que não é possivel executar a operaçãos
        res.writeHead(405, {'Content-Type': 'text/html; charset=utf-8'});
        res.write('<h1 align="center"> 405 method now allowed </h1>');
        res.end();
    }
    
}).listen(port);

console.log(`${new Date().toISOString().substring(0,16)} Server started running in port ${port}`)