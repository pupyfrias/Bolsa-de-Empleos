exports.compare = (dato1, datos2)=>{
    return dato1==datos2
}

exports.sum = (dato1, datos2)=>{
    return dato1+datos2
}

exports.min = (dato1, datos2)=>{
    return dato1-datos2
}

exports.date = (dato)=>{
    return new Date(dato).toDateString()
}