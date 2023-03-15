const axios = require('axios')

module.exports.addUser = function (user) {
    return axios.post('http://localhost:3000/users', user)
           .then(resp => {
                return resp.data
           }).catch(err => {return err});
}