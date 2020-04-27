module.exports = (router, mongoose, jwt, config) => {

    var User = require("../orm/user");
    var Task = require("../orm/task");

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
        if (token){
            var decoded = jwt.verify(token, config.JWT_SECRET)
            Task.find({user : decoded.id}, (error, docs) => {
                if(error){
                    console.log(getDate(), " Fetching tasks ", req.user , error, docs)
                    res.status(401)
                    res.send({response: 'FAIL', reason: 'error'})
                }
                if (docs) {
                    console.log(getDate(), "Fetched tasks: ", decoded._id)
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
        Task.findOneAndUpdate({_id: req.body.id}, 
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
                console.log(getDate(), " Error editing task: ", task , error)
                res.status(401)
                res.send({response: 'FAIL', reason: 'error'})
            }
            if (docs) {
                console.log(getDate(), "Edited task : ", task.name)
                res.status(200)
                res.send({response: 'OK'})
            }
        })
    })
}