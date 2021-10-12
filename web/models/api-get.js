const fetch = require('node-fetch');

//JOB
exports.JobOne = async(id, cb) => {

    await fetch('http://localhost:5002/api/job/' + id)
        .then(fetch => fetch.json())
        .then(jsonData => cb(jsonData))

}

exports.DeleteJob = async(ids, cb) => {

    await fetch('http://localhost:5002/api/job/delete/' + ids)
        .then(fetch => fetch.json())
        .then(jsonData => cb(jsonData))

}

exports.JobAll = async(search, cb) => {

    await fetch('http://localhost:5002/api/job/all' + search)
        .then(fetch => fetch.json())
        .then(jsonData => cb(jsonData))

}
exports.JobAllWithLimit = async(searches, cb) => {

    await fetch('http://localhost:5002/api/job/all?' + searches)
        .then(fetch => fetch.json())
        .then(jsonData => cb(jsonData))

}



//CATEGORY
exports.category = async(cb) => {

    await fetch('http://localhost:5002/api/category/all')
        .then(fetch => fetch.json())
        .then(jsonData => cb(jsonData))

}

exports.setCategory = async(category, boolean) => {

    await fetch('http://localhost:5002/api/category/' + category + '?enable=' + boolean)
        .then(fetch => fetch.json())
        .then(jsonData => console.log(jsonData))

}

//USER
exports.user = async(username, cb) => {

    await fetch('http://localhost:5002/api/user/' + username)
        .then(fetch => fetch.json())
        .then(jsonData => cb(jsonData))

}
exports.userConfirm = async(code, cb) => {

    await fetch('http://localhost:5002/api/user/confirm/' + code)
        .then(fetch => fetch.json())
        .then(jsonData => cb(jsonData))

}
exports.userUpdate = async(code, cb) => {

    await fetch('http://localhost:5002/api/user/update/' + code)
        .then(fetch => cb(fetch))


}
exports.userExist = async(username, email, cb) => {

    let searches = new URLSearchParams
    searches.append('username', username)
    searches.append('email', email)


    await fetch('http://localhost:5002/api/exist?' + searches)
        .then(fetch => fetch.json())
        .then(jsonData => cb(jsonData))
        .catch(err => cb({ exist: false }))

}