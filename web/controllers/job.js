const fs = require('fs')
const path = require('path')
const apiGet = require('../models/api-get')



exports.GetJob = (req, res, next) => {

    const { id } = req.params
    apiGet.JobOne(id, (data) => {

        res.render('jobs/job-details', {
            pageTitle: data.category + 'Job',
            datos: data
        })
    })
}

exports.GetAllJobs = (req, res, next) => {
    let { search, page } = req.query
    let { category } = req.params

    category = category.charAt(0).toUpperCase() + category.substr(1).toLowerCase();
    let limit = 0
    page = page != undefined ? page - 1 : 0
    let searches = new URLSearchParams
    let url = new URL(req.protocol + '://' + req.get('host') + req.originalUrl)
    url.searchParams.delete('page')

    fs.readFile(path.join(__dirname, '../utils/pagination.txt'), 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        limit = parseInt(data)

        if (search) {
            searches.set('search', search)
        }

        searches.set('page', page)
        searches.set('limit', limit)
        searches.set('category', category)
        searches.set('offset', limit * page)
        apiGet.JobAllWithLimit(searches, (data) => {

            let last = data.count / limit
            last = Number.isInteger(last) ? last : parseInt(last) + 1

            res.render('jobs/all-jobs', {
                pageTitle: `All ${category} Jobs`,
                datos: data.rows,
                activeSearch: true,
                search: search,
                category: category,
                page: page + 1,
                last: last,
                activePagination: last > 1,
                url: url.href,
                hasParams: url.href.includes('?')

            })

        }).catch(err => {
            console.log(err)
        })
    })

}