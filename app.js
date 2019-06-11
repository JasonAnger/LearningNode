const express = require('express')
const pug = require('pug')

const db = require('./db')
const usersRouter = require('./router/users.router')

const app = express()

var port = 3000

app.set("view engine", "pug")
app.set("views", "./views")

app.use(express.static('public'))



app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


//var users = [{id: 1, name: 'An'},{id:2, name: 'Thu'},{id:3, name:'Lam'}]

app.get('/', function(req,res){
    res.render('users/index', {
        users: db.get('users').value()
    })
})

app.use('/users', usersRouter)

app.listen(3000, function(){
    console.log('Server listening on port '+port)
})