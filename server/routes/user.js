module.exports = (router, mongoose, jwt, config) => {

    var User = require("../orm/user");
    var Task = require("../orm/task");
    var Habbit = require("../orm/habbit");
    var Project = require("../orm/project");
    var Daily = require("../orm/daily");

    router.get('/users', (req, res) => {
        let model = req.body
        User.find(
            {}, 
            (error, docs) => {
                if(error){
                    console.log(getDate(), "Error logging in for ", model.username, "ERROR : ", error);
                    res.status(401)
                    res.send({response: 'FAIL', reason: 'error'})
                }
                if(docs){
                    console.log(getDate(), "New logging by : ", docs.username)
                    res.status(200)
                    res.send({response: 'OK', users: docs})
                } else {
                    console.log(model, docs, error)
                    res.status(401)
                    res.send({response: 'FAIL', reason: 'invalid'})
                }
            }
        )
    });

    router.get('/tasks', (req, res) => {
        var token = req.headers["auth"]
        console.log(token)
        if (token){
            var decoded = jwt.verify(token, config.JWT_SECRET)
            console.log(decoded)
            Task.find({user : decoded.id}, (error, docs) => {
                if(error){
                    console.log(getDate(), " Fetching tasks ", req.user , error, docs)
                    res.status(401)
                    res.send({response: 'FAIL', reason: 'error'})
                }
                if (docs) {
                    console.log(getDate(), "Fetched tasks: ", decoded.id)
                    res.status(200)
                    res.send({response: 'OK', tasks: docs})
                }
        })
        } else {
            console.log(getDate(), " Fetching tasks ", req.user , error, docs)
            res.status(401)
            res.send({response: 'FAIL', reason: 'error'})
        }
    })

    router.post('/task', (req, res) => {

        var task = new Task ({
            user: req.body.user,
            name: req.body.name,
            description: req.body.description,
            points: req.body.points,
            project: req.body.project,
            due: req.body.due
        })
        task.save(task, (error, docs) => {
            if(error){
                console.log(getDate(), " Error adding task: ", task )
                res.status(401)
                res.send({response: 'FAIL', reason: 'error'})
            }
            if (docs) {
                console.log(getDate(), "Added new task : ", task.name)
                res.status(200)
                res.send({response: 'OK'})
            }
        })
    })
    router.post('/editTask', (req, res) => {
        console.log(req.body)
        Task.findOneAndUpdate({_id: req.body._id}, 
            { $set:{
                user: req.body.user,
                name: req.body.name,
                description: req.body.description,
                points: req.body.points,
                project: req.body.project,
                due: req.body.due
            }
            }, {useFindAndModify: false}, (error, docs) => {
            if(error){
                console.log(getDate(), " Error editing task: ", error)
                res.status(401)
                res.send({response: 'FAIL', reason: 'error'})
            }
            if (docs) {
                console.log(getDate(), "Edited task : ", req.body.name)
                res.status(200)
                res.send({response: 'OK'})
            }
        })
    })
}