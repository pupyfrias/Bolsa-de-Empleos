const fetch = require('node-fetch');
const { URLSearchParams } = require('url')

//JOB
exports.job = async(url, cb) => {

    await fetch('http://localhost:5002/jo' + url)
        .then(fetch => fetch.json())
        .then(jsonData => cb(jsonData))

}



//USER
exports.user = async(username, cb) => {
    await fetch('http://localhost:5002/api/user', {
            method: 'post',
            body: JSON.stringify({ username: username }),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(fetch => fetch.json())
        .then(jsonData => cb(jsonData))

}
exports.newCode = async(code, date, id, cb) => {
    await fetch('http://localhost:5002/api/new-code/', {
            method: 'post',
            body: JSON.stringify({ code: code, date: date, id: id }),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(fetch => fetch.json())
        .then(jsonData => cb(jsonData))
}
exports.userCreate = async(name, lastname, username, password, email, code, date, cb) => {
    await fetch('http://localhost:5002/api/create-account', {
        method: 'post',
        body: JSON.stringify({
            name: name,
            lastname: lastname,
            username: username,
            password: password,
            email: email,
            code: code,
            date: date
        }),
        headers: { 'Content-Type': 'application/json' }
    }).then(cb({ exectu: true }))

}

//POSTER
exports.posterUpdate = async(id, category, type, company, url, position, location, description, logo, active) => {

    await fetch('http://localhost:5002/api/poster/' + id, {
        method: 'post',
        body: JSON.stringify({
            category: category,
            type: type,
            company: company,
            url: url,
            logo: logo,
            position: position,
            location: location,
            description: description,
            active: active
        }),
        headers: { 'Content-Type': 'application/json' }
    })
}

exports.poster = async(category, type, company, url, position, location, description, email, logo, cb) => {

    await fetch('http://localhost:5002/api/poster', {
            method: 'post',
            body: JSON.stringify({
                category: category,
                type: type,
                company: company,
                url: url,
                logo: logo,
                position: position,
                location: location,
                description: description,
                email: email
            }),
            headers: { 'Content-Type': 'application/json' }
        }).then(fetch => fetch.json())
        .then(jsonData => cb(jsonData))
}