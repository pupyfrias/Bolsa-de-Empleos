const fetch = require('node-fetch');
const {URLSearchParams} = require('url')

exports.job = async (url,cb)=>{

    await  fetch('http://localhost:5002/'+url)
    .then(fetch => fetch.json())
    .then(jsonData => cb(jsonData))
   
}

exports.categoria = async (categoria,boolen)=>{

    await  fetch('http://localhost:5002/api/categoria/'+categoria,{
        methed: 'post',
        body: JSON.stringify({enable:boolen}),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(fetch => fetch.json())
    .then(jsonData => console.log(jsonData))
   
}


exports.user = async (username,cb)=>{

    await  fetch('http://localhost:5002/api/user',{
        method: 'post',
        body: JSON.stringify({username:username}),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(fetch => fetch.json())
    .then(jsonData => cb(jsonData))

    
   
}