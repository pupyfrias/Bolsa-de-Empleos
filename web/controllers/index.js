const apiGet = require('../models/api-get')

exports.GetIndex = (req, res, next) => {


    let { search } = req.query
    search = search != undefined ? '?search=' + search : ''
    console.log(search)
    apiGet.JobAll(search, (data) => {

        let designList = [];
        let programmingList = [];
        let design = 0;
        let programming = 0;

        data.rows.forEach(data => {

            if (data.category == 'Design') {
                design++
                if (designList.length < 10) {
                    designList.push(data)
                }
            } else if (data.category == 'Programming') {
                programming++;
                if (programmingList.length < 10) {
                    programmingList.push(data)
                }
            }
        })


        apiGet.category((data) => {

            res.render('index', {
                pageTitle: 'Home',
                design: designList,
                programming: programmingList,
                allDesign: design > 10,
                allProgramming: programming > 10,
                search: search.replace('?search=', ''),
                activeSearch: true,
                enableDesign: design < 1 ? false : data[0].enable,
                enableProgramming: programming < 1 ? false : data[1].enable,
            })
        })


    }).catch(err => {
        console.log(err)
    })





}