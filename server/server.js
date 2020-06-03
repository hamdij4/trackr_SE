const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
// const port = process.env.PORT || 8080;
const path = require('path')
const bodyParser = require('body-parser')
app.use(bodyParser.json())

// console.log(port, process.env.HEROKU)

// let config;
// if (!process.env.HEROKU) {
//     config = require('./config');
// }

var mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL , {useNewUrlParser: true});

let user_router = express.Router()
require('./routes/user.js')(user_router, mongoose, jwt);
app.use('/user', user_router);

var User = require("./models/user");
app.post('/authenticate', (req, res) => {
    let model = req.body
    User.findOne(
        { $and: [ {username : model.username}, {password : model.password}]}, 
        (error, docs) => {
            if(error){
                console.log(getDate(), "Error logging in for ", model.username, "ERROR : ", error);
                res.status(401)
                res.send({response: 'FAIL', reason: 'error'})
            }
            if(docs){
                let token = jwt.sign (
                    {
                        username : req.body.username,
                        id: docs._id,
                        type : docs.type,
                        exp: Math.floor(Date.now() / 1000) + 3600
                    },
                    process.env.JWT_SECRET || config.JWT_SECRET
                )
                console.log(getDate(), "New logging by : ", docs.username)
                res.status(200)
                res.send({response: 'OK', jwt : token, user : docs.username, type : docs.type})
            } else {
                console.log(model, docs, error)
                res.status(401)
                res.send({response: 'FAIL', reason: 'invalid'})
            }
        }
    )
})
app.post('/registration', (req, res) => {
    user = new User({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        birthday: req.body.birthday
    })
    User.findOne({email : user.email}, (error, docs) => {
        if(error) throw error
        if(docs){
            console.log(getDate(), "Duplicate email error for ", user.email)
            res.status(406)
            res.send({response : 'FAIL', reason: 'email'})
        } else {
            User.findOne({username : user.username}, (error, docs) => {
                if(error) throw error
                if(docs){
                    console.log(getDate(), "Duplicate username error for ", user.username)
                    res.status(406)
                    res.send({response : 'FAIL', reason: 'username'})
                } else {
                    user.save(user, (error, docs) => {
                        if(error){
                            console.log(getDate(), " Error registering user: ", user.username, error, docs)
                            res.status(401)
                            res.send({response: 'FAIL', reason: 'error'})
                        }
                        if (docs) {
                            console.log(getDate(), "New user registered : ", user.username)
                            res.status(200)
                            res.send({response: 'OK'})
                        }
                    })
                }
            })
        }
    })
})

app.use(express.static(path.join(__dirname, '../client/build')))

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0');
