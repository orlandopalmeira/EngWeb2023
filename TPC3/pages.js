// module pages.bs By Orlando Palmeira 2023
var fs = require('fs');

exports.sendStyleSheet = function(stylesheetPath, res){
    fs.readFile(stylesheetPath, (err, data) => {
        if(err){
            res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
            res.end('<h1 align="center">404 Stylesheet Not Found</h1>')
        }else{
            res.writeHead(200, {'Content-Type': 'text/css'})
            res.end(data)
        }
    })
}

exports.initPage = function () {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="w3.css">
    <title>Página inicial</title>
</head>
<body>
    <div class="w3-card-4">

        <header class="w3-container w3-teal">
        <h1>Base de dados de pessoas</h1>
        </header>

        <div class="w3-container">
            <a href="http://localhost:7777/pessoas">Lista de pessoas</a> <br>
            <a href="http://localhost:7777/pessoas?order=asc">Lista de pessoas ordenada</a> <br>
            <a href="http://localhost:7777/sexo">Distribuição por sexo</a> <br>
            <a href="http://localhost:7777/desporto">Distribuição por desporto</a> <br>
            <a href="http://localhost:7777/profissao">Top 10 profissões</a>
        </div>

        <footer class="w3-container w3-teal">
            <h5 align="center">By Orlando Palmeira</h5>
        </footer>

    </div>
</body>
</html>`
}

exports.peoplePage = function(list){ // recebe uma lista de pessoas
    pagHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="w3.css">
    <title>Pessoas</title>
</head>
<body>
    <div class="w3-card-4">

        <header class="w3-container w3-teal">
            <h1>Base de dados de pessoas <a href="http://localhost:7777/">[Voltar à página inicial]</a></h1>
        </header>

        <div class="w3-bar w3-teal">
            <a href="http://localhost:7777/pessoas" class="w3-bar-item w3-button w3-mobile">Ordem normal</a>
            <a href="http://localhost:7777/pessoas?order=asc" class="w3-bar-item w3-button w3-mobile">Ordem alfabética crescente</a>
            <a href="http://localhost:7777/pessoas?order=desc" class="w3-bar-item w3-button w3-mobile">Ordem alfabética decrescente</a>
        </div>

        <div class="w3-container">
            <table class="w3-table-all w3-hoverable">
                <tr class="w3-teal">
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Idade</th>
                    <th>Sexo</th>
                    <th>cidade</th>
                </tr>
        `
    list.forEach(pessoa => {
        pagHTML += `
                <tr>
                    <td>${pessoa.id}</th>
                    <td><a href="http://localhost:7777/pessoas?id=${pessoa.id}">${pessoa.nome}</a></td>
                    <td>${pessoa.idade}</td>
                    <td>${pessoa.sexo}</td>
                    <td>${pessoa.morada.cidade}</td>
                </tr>
        `
    });

    pagHTML += `
            </table>
        </div>
    
        <footer class="w3-container w3-teal">
            <h5 align="center">By Orlando Palmeira</h5>
        </footer>

    </div>
</body>
</html>`
    return pagHTML
}

exports.gendersPage = function(list){
    let sexos = {}
    list.forEach(elem => {
        sexos[elem.sexo] = elem.sexo in sexos ? sexos[elem.sexo] + 1 : 1
    })

    pagHTML = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="w3.css">
        <title>Distribuição por sexos</title>
    </head>
    <body>
    <div class="w3-card-4">

        <header class="w3-container w3-teal">
            <h1>Distribuição por sexos <a href="http://localhost:7777/">[Voltar à página inicial]</a></h1>
        </header>
        <div class="w3-container">
            <table class="w3-table-all w3-hoverable">
                <tr class="w3-teal">
                    <th>Sexo</th>
                    <th>Número de indivíduos</th>
                </tr>
    `
    for(const key in sexos){
        pagHTML += `
                <tr>
                    <td>${key}</td>
                    <td><a href="http://localhost:7777/pessoas?sexo=${key}">${sexos[key]}</a></td>
                </tr>
        `
    }
    pagHTML += `
            </table>
        </div>
    
        <footer class="w3-container w3-teal">
            <h5 align="center">By Orlando Palmeira</h5>
        </footer>

    </div>
</body>
</html>`
    return pagHTML

}

exports.genderPage = function(gender, list) {
    let list_ = list.filter(p => p.sexo == gender)
    let sexos = {}
    list.forEach(elem => {
        sexos[elem.sexo] = elem.sexo in sexos ? sexos[elem.sexo] + 1 : 1
    })
    pagHTML = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="w3.css">
        <title>Indivíduos do sexo ${gender}</title>
    </head>
    <body>
    <div class="w3-card-4">

        <header class="w3-container w3-teal">
            <h1>Indivíduos do sexo ${gender} (${list_.length} indivíduos)<a href="http://localhost:7777/">[Voltar à página inicial]</a></h1>
        </header>

        <div class="w3-bar w3-teal">
        `
        for(const key in sexos){
            pagHTML += `
            <a href="http://localhost:7777/pessoas?sexo=${key}" class="w3-bar-item w3-button w3-mobile">Sexo: ${key} (${sexos[key]})</a>
            `
        }
        pagHTML += `
        </div>

        <div class="w3-container">
            <table class="w3-table-all w3-hoverable">
                <tr class="w3-teal">
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Idade</th>
                    <th>cidade</th>
                </tr>`
    list_.forEach(pessoa => {
        pagHTML += `
                <tr>
                    <td>${pessoa.id}</td>
                    <td><a href="http://localhost:7777/pessoas?id=${pessoa.id}">${pessoa.nome}</a></td>
                    <td>${pessoa.idade}</td>
                    <td>${pessoa.morada.cidade}</td>
                </tr>
        `
    })
    pagHTML += `
            </table>
        </div>
    
        <footer class="w3-container w3-teal">
            <h5 align="center">By Orlando Palmeira</h5>
        </footer>

    </div>
</body>
</html>`
    return pagHTML
}

exports.sportsPage = function(list) {
    let desportos = {}
    list.forEach(pessoa => {
        let desportos_ = new Set(pessoa.desportos)
        desportos_.forEach(desp => {
            if(desp in desportos){
                desportos[desp] += 1
            } else {
                desportos[desp] = 1
            }
        })
    })

    pagHTML = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="w3.css">
        <title>Distribuição por desportos</title>
    </head>
    <body>
    <div class="w3-card-4">

        <header class="w3-container w3-teal">
            <h1>Distribuição por desportos <a href="http://localhost:7777/">[Voltar à página inicial]</a></h1>
        </header>
        <div class="w3-container">
            <table class="w3-table-all w3-hoverable">
                <tr class="w3-teal">
                    <th>Desporto</th>
                    <th>Número de indivíduos</th>
                </tr>
    `
    for(const key in desportos){
        pagHTML += `
                <tr>
                    <td>${key}</td>
                    <td><a href="http://localhost:7777/pessoas?desporto=${key}">${desportos[key]}</a></td>
                </tr>
        `
    }
    pagHTML += `
            </table>
        </div>
    
        <footer class="w3-container w3-teal">
            <h5 align="center">By Orlando Palmeira</h5>
        </footer>

    </div>
</body>
</html>`
    return pagHTML
}

exports.sportPage = function (sport, list){
    let list_ = list.filter(p => p.desportos.includes(sport))
    let desportos = {}
    list.forEach(pessoa => {
        let desportos_ = new Set(pessoa.desportos)
        desportos_.forEach(desp => {
            if(desp in desportos){
                desportos[desp] += 1
            } else {
                desportos[desp] = 1
            }
        })
    })
    pagHTML = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="w3.css">
        <title>Indivíduos que praticam ${sport}</title>
    </head>
    <body>
    <div class="w3-card-4">

        <header class="w3-container w3-teal">
            <h1>Indivíduos que praticam ${sport} (${list_.length} indivíduos)<a href="http://localhost:7777/">[Voltar à página inicial]</a></h1>
        </header>
        <div class="w3-cell-row">
        <div class="w3-container w3-cell">
        <div class="w3-bar-block w3-teal">
        `
        for(const key in desportos){
            pagHTML += `
                <a href="http://localhost:7777/pessoas?desporto=${key}" class="w3-bar-item w3-button w3-mobile">${key} (${desportos[key]})</a>
            `
        }
        pagHTML += `
        </div>
        </div>
        
        <div class="w3-container w3-cell">
        <div class="w3-container">
            <table class="w3-table-all w3-hoverable">
                <tr class="w3-teal">
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Idade</th>
                    <th>cidade</th>
                </tr>`
    list_.forEach(pessoa => {
        pagHTML += `
                <tr>
                    <td>${pessoa.id}</td>
                    <td><a href="http://localhost:7777/pessoas?id=${pessoa.id}">${pessoa.nome}</a></td>
                    <td>${pessoa.idade}</td>
                    <td>${pessoa.morada.cidade}</td>
                </tr>
        `
    })
    pagHTML += `
            </table>
        </div>
        </div>

        </div>
        <footer class="w3-container w3-teal">
            <h5 align="center">By Orlando Palmeira</h5>
        </footer>

    </div>
</body>
</html>`
    return pagHTML
}

exports.jobsPage = function (list) {
    let profissoes = {}
    list.forEach(pessoa => {
        if (pessoa.profissao in profissoes) {
            profissoes[pessoa.profissao]++
        }else{
            profissoes[pessoa.profissao] = 1
        }
    })
    let arr = Object.entries(profissoes).sort((job1,job2) => job2[1] - job1[1]).slice(0,10)

    pagHTML = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="w3.css">
        <title>Top 10 profissões</title>
    </head>
    <body>
    <div class="w3-card-4">

        <header class="w3-container w3-teal">
            <h1>Top 10 profissões <a href="http://localhost:7777/">[Voltar à página inicial]</a></h1>
        </header>
        <div class="w3-container">
            <table class="w3-table-all w3-hoverable">
                <tr class="w3-teal">
                    <th>Profissão</th>
                    <th>Número de indivíduos</th>
                </tr>
    `
    arr.forEach(elem => {
        pagHTML += `
                <tr>
                    <td>${elem[0]}</td>
                    <td><a href="http://localhost:7777/pessoas?profissao=${elem[0]}">${elem[1]}</a></td>
                </tr>
        `
    })
    pagHTML += `
            </table>
        </div>
    
        <footer class="w3-container w3-teal">
            <h5 align="center">By Orlando Palmeira</h5>
        </footer>

    </div>
</body>
</html>`
    return pagHTML
}

exports.jobPage = function (job, list){
    let list_ = list.filter(pessoa => pessoa.profissao == job)
    let profissoes = {}
    list.forEach(pessoa => {
        if (pessoa.profissao in profissoes) {
            profissoes[pessoa.profissao]++
        }else{
            profissoes[pessoa.profissao] = 1
        }
    })
    let arr = Object.entries(profissoes).sort((job1,job2) => job2[1] - job1[1]).slice(0,10)


    pagHTML = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="w3.css">
        <title>Indivíduos com a profissão ${job}</title>
    </head>
    <body>
    <div class="w3-card-4">

        <header class="w3-container w3-teal">
            <h1>Indivíduos com a profissão ${job} (${list_.length} indivíduos)<a href="http://localhost:7777/">[Voltar à página inicial]</a></h1>
        </header>
        <div class="w3-cell-row">
        <div class="w3-container w3-cell">
        <div class="w3-bar-block w3-teal">
        `
        arr.forEach(job_ => {
            pagHTML += `
                <a href="http://localhost:7777/pessoas?profissao=${job_[0]}" class="w3-bar-item w3-button w3-mobile">${job_[0]} (${job_[1]})</a>
            `
        })
        pagHTML += `
        </div>
        </div>
        
        <div class="w3-container w3-cell">
        <div class="w3-container">
            <table class="w3-table-all w3-hoverable">
                <tr class="w3-teal">
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Idade</th>
                    <th>cidade</th>
                </tr>`
    list_.forEach(pessoa => {
        pagHTML += `
                <tr>
                    <td>${pessoa.id}</td>
                    <td><a href="http://localhost:7777/pessoas?id=${pessoa.id}">${pessoa.nome}</a></td>
                    <td>${pessoa.idade}</td>
                    <td>${pessoa.morada.cidade}</td>
                </tr>
        `
    })
    pagHTML += `
            </table>
        </div>
        </div>

        </div>
        <footer class="w3-container w3-teal">
            <h5 align="center">By Orlando Palmeira</h5>
        </footer>

    </div>
</body>
</html>`
    return pagHTML
}

exports.personPage = function (pID, list){
    let person = list.filter(pessoa => pessoa.id == pID)[0]
    pagHTML = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="w3.css">
        <title>${person.nome}</title>
    </head>
    <body>
    <div class="w3-card-4">

        <header class="w3-container w3-teal">
            <h1>${person.nome}<a href="http://localhost:7777/">[Voltar à página inicial]</a></h1>
        </header>
        <div class="w3-cell-row">
        <div class="w3-container w3-cell">
        <div class="w3-bar-block w3-teal">
    `
    list.forEach(person_ => {
        pagHTML += `
            <a href="http://localhost:7777/pessoas?id=${person_.id}" class="w3-bar-item w3-button w3-mobile">${person_.nome}</a>
        `
    })
    pagHTML += `
        </div>
        </div>
        
        <div class="w3-container w3-cell">
        <div class="w3-container">
            <table class="w3-table-all w3-striped w3-border">
    `
    for(const key in person){
        let field = person[key]
        if(Array.isArray(field)){
            pagHTML += `
            <tr>
                <th class="w3-teal">${key}</th>
                <td>
            `
            field.forEach(elem => {
                pagHTML += `${elem}<br>`
            })
            pagHTML += `</td>
            </tr>
            `
        } else if(typeof field == 'object'){
            pagHTML += `
            <tr>
                <th class="w3-teal">${key}</th>
                <td>
                <table class="w3-table-all w3-striped w3-bordered">
                    <tr class="w3-teal">\n`
            for(const key_ in field){
                pagHTML += `<th>${key_}</th>\n`
            }
            pagHTML += `</tr>
                        <tr>\n`
            for(const key_ in field){
                pagHTML += `<td>${field[key_]}</td>\n`
            }
            pagHTML += `</tr>
                </table>
                </td>
            </tr>`

        } else {
            pagHTML += `
            <tr>
                <th class="w3-teal">${key}</th>
                <td>${field}</td>
            </tr>`
        }
    }
    pagHTML += `
            </table>
        </div>
        </div>

        </div>
        <footer class="w3-container w3-teal">
            <h5 align="center">By Orlando Palmeira</h5>
        </footer>

    </div>
</body>
</html>`

    return pagHTML
}