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

    // Task Endpoints
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

    // Task Endpoints
    router.get('/habbits', (req, res) => {
        var token = req.headers["auth"]
        if (token){
            var decoded = jwt.verify(token, config.JWT_SECRET)
            console.log(decoded)
            Habbit.find({user : decoded.id}, (error, docs) => {
                if(error){
                    console.log(getDate(), " Fetching habbits ", req.user , error, docs)
                    res.status(401)
                    res.send({response: 'FAIL', reason: 'error'})
                }
                if (docs) {
                    console.log(getDate(), "Fetched habbits: ", decoded.id)
                    res.status(200)
                    res.send({response: 'OK', habbits: docs})
                }
        })
        } else {
            console.log(getDate(), " Fetching tasks ", req.user , error, docs)
            res.status(401)
            res.send({response: 'FAIL', reason: 'error'})
        }
    })

    router.post('/habbit', (req, res) => {

        var habbit = new Habbit ({
            user: req.body.user,
            name: req.body.name,
            description: req.body.description,
            points: req.body.points,
            positive_count: req.body.positive_count,
            negative_count: req.body.negative_count
        })
        habbit.save(habbit, (error, docs) => {
            if(error){
                console.log(getDate(), " Error adding habbit: ", habbit )
                res.status(401)
                res.send({response: 'FAIL', reason: 'error'})
            }
            if (docs) {
                console.log(getDate(), "Added new habbit : ", habbit.name)
                res.status(200)
                res.send({response: 'OK'})
            }
        })
    })
    router.post('/editHabbit', (req, res) => {
        Habbit.findOneAndUpdate({_id: req.body._id}, 
            { $set:{
                user: req.body.user,
                name: req.body.name,
                description: req.body.description,
                points: req.body.points,
                positive_count: req.body.positive_count,
                negative_count: req.body.negative_count
            }
            }, {useFindAndModify: false}, (error, docs) => {
            if(error){
                console.log(getDate(), " Error editing habbit: ", error)
                res.status(401)
                res.send({response: 'FAIL', reason: 'error'})
            }
            if (docs) {
                console.log(getDate(), "Edited habbit : ", req.body.name)
                res.status(200)
                res.send({response: 'OK'})
            }
        })
    })

    // Daily Endpoints
    router.get('/dailies', (req, res) => {
        var token = req.headers["auth"]
        if (token){
            var decoded = jwt.verify(token, config.JWT_SECRET)
            console.log(decoded)
            Daily.find({user : decoded.id}, (error, docs) => {
                if(error){
                    console.log(getDate(), " Fetching dailies ", req.user , error, docs)
                    res.status(401)
                    res.send({response: 'FAIL', reason: 'error'})
                }
                if (docs) {
                    console.log(getDate(), "Fetched dailies: ", decoded.id)
                    res.status(200)
                    res.send({response: 'OK', dailies: docs})
                }
        })
        } else {
            console.log(getDate(), " Fetching tasks ", req.user , error, docs)
            res.status(401)
            res.send({response: 'FAIL', reason: 'error'})
        }
    })

    router.post('/daily', (req, res) => {

        var daily = new Daily ({
            user: req.body.user,
            name: req.body.name,
            description: req.body.description,
            points: req.body.points,
            count: req.body.count,
            done: req.body.done
        })
        daily.save(daily, (error, docs) => {
            if(error){
                console.log(getDate(), " Error adding daily: ", daily )
                res.status(401)
                res.send({response: 'FAIL', reason: 'error'})
            }
            if (docs) {
                console.log(getDate(), "Added new daily : ", daily.name)
                res.status(200)
                res.send({response: 'OK'})
            }
        })
    })
    router.post('/editDaily', (req, res) => {
        Daily.findOneAndUpdate({_id: req.body._id}, 
            { $set:{
                user: req.body.user,
                name: req.body.name,
                description: req.body.description,
                points: req.body.points,
                count: req.body.count,
                done: req.body.done
            }
            }, {useFindAndModify: false}, (error, docs) => {
            if(error){
                console.log(getDate(), " Error editing daily: ", error)
                res.status(401)
                res.send({response: 'FAIL', reason: 'error'})
            }
            if (docs) {
                console.log(getDate(), "Edited daily : ", req.body.name)
                res.status(200)
                res.send({response: 'OK'})
            }
        })
    })
}