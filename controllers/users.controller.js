const pug = require('pug')
const shortid = require('shortid')

const db = require('../db')

module.exports.index = function (req, res) {
    res.render('users/index', {
        users: db.get('users').value()
    })
}

module.exports.search = function (req, res) {
    var q = req.query.q
    var matchedUser = db.get('users').value().filter(function (user) {
        return user.name.toLocaleLowerCase().indexOf(q.toLocaleLowerCase()) !== -1
    })
    res.render('users/index', {
       users: matchedUser
    })
}

module.exports.create = function (req, res) {
    res.render('users/create')
}

module.exports.postCreate = function (req, res) {
    //req.body.push(id=users[users.lastIndexOf().id]+1)
    req.body.id = shortid.generate()
    var errors = []
    if (!req.body.name) {
        errors.push('Name is required.')
    }
    if (!req.body.phone) {
        errors.push('Password is required.')
    }
    if(errors.length) {
        res.render('users/create', {
            errors: errors,
            values: req.body
        })
        return
    }
    db.get("users").push(req.body).write()
    res.redirect('/users')
}

module.exports.viewID = function (req, res) {
    var id = req.params.id
    var user = db.get('users').find({ id: id }).value()
    res.render('users/view', {
        user: user
    })
}