// module getdata.js by Orlando Palmeira 2023-03-12

const axios = require('axios');
const { parse } = require('querystring')

exports.collectRequestBodyData = function(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}


exports.getTasks = function(callback) {
    axios.get('http://localhost:3000/tasks')
    .then(resp => {
        let fin = resp.data.filter(task => task.finished)
        let notFin = resp.data.filter(task => !task.finished)
        let users;
        axios.get('http://localhost:3000/users')
        .then(resp => {
            users = resp.data
            fin.forEach(element => {
                element.who = users.filter(user => user.id == element.who)[0].name
            });
            notFin.forEach(element => {
                element.who = users.filter(user => user.id == element.who)[0].name
            });
            callback({finished: fin, not_finished: notFin});
        })
        .catch(err => callback(null))
    })
    .catch(err => callback(null))
}

exports.getUsers = function(callback) {
    axios.get('http://localhost:3000/users')
    .then(resp => {
        callback(resp.data)
    }).catch(err => callback(null))
}