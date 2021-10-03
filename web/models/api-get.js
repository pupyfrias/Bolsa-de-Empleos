const fetch = require('node-fetch');

exports.job = async (url,cb)=>{

    await  fetch('http://localhost:5002/'+url)
    .then(fetch => fetch.json())
    .then(jsonData => cb(jsonData))
   
}

exports.categoria = async (cb)=>{

    await  fetch('http://localhost:5002/api/categoria/all')
    .then(fetch => fetch.json())
    .then(jsonData => cb(jsonData))
   
}

exports.user = async (username,cb)=>{

    await  fetch('http://localhost:5002/api/user/'+username)
    .then(fetch => fetch.json())
    .then(jsonData => cb(jsonData))
   
}