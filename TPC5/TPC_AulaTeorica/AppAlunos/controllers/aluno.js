const axios = require('axios')

// student list
module.exports.list = function () {
    return axios.get('http://localhost:3000/alunos?_sort=nome')
           .then(resp => {
                return resp.data
           })
           .catch(error => {return erro})
}

module.exports.getAluno = function (id) {
    return axios.get('http://localhost:3000/alunos/' + id)
            .then(resp => {
                return resp.data
            })
            .catch(error => {return error})
        
}

