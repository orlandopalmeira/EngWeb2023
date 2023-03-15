const axios = require('axios')

module.exports.getTasks = function(){
    return axios.get('http://localhost:3000/tasks')
           .then(resp => {
                return {
                    finished: resp.data.filter(task => task.finished == 'true'),
                    not_finished: resp.data.filter(task => task.finished == 'false')
                }
           })
           .catch(erro => {return erro})
}

module.exports.getTask = function(id){
    return axios.get('http://localhost:3000/tasks/' + id)
           .then(resp => {
                return resp.data
           })
           .catch(erro => {return erro})
}

module.exports.addTask = function (task) {
    return axios.post('http://localhost:3000/tasks/', task)
            .then(resp => {
                return resp.data
            })
            .catch(erro => {return erro})
}

module.exports.editTask = function (task) {
    return axios.put('http://localhost:3000/tasks/' + task.id, task)
           .then(resp => {
                return resp.data
           })
           .catch(erro => {return erro})
}

module.exports.deleteTask = function (task_id) {
    return axios.delete('http://localhost:3000/tasks/' + task_id)
           .then(resp => {
                return resp.data
           }).catch(erro => {return erro});
}
