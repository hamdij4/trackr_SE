module.exports = (router, mongoose, jwt, config) => {

    var User = require("../models/user");
    var Task = require("../models/task");
    var Habbit = require("../models/habbit");
    var Project = require("../models/project");
    var Daily = require("../models/daily");

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
            Task.find({user : decoded.id, archived : false}, (error, docs) => {
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

    router.get('/allTasks', (req, res) => {
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

    router.post('/editSettings', (req, res) => {
        
        User.findOneAndUpdate({username: req.body.for}, 
            { $set:{
                username: req.body.name,
                description: req.body.description,
                password: req.body.password,
                email: req.body.email
            }
            }, {useFindAndModify: true}, (error, docs) => {
            if(error){
                console.log(getDate(), " Error editing user: ", error)
                res.status(401)
                res.send({response: 'FAIL', reason: 'error'})
            }
            if (docs) {
                console.log(getDate(), "Edited user : ", req.body.name)
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
    router.post('/finishTask', (req, res) => {
        console.log(req.body)
        let date = new Date()
        Task.findOneAndUpdate({_id: req.body._id}, 
            { $set:{
                finished: true,
                finish : date
            }
            }, {useFindAndModify: false}, (error, docs) => {
            if(error){
                console.log(getDate(), " Error finishing task: ", error)
                res.status(401)
                res.send({response: 'FAIL', reason: 'error'})
            }
            if (docs) {
                console.log(getDate(), "Finished task : ", req.body._id)
                res.status(200)
                res.send({response: 'OK'})
            }
        })
    })
    router.post('/archiveTask', (req, res) => {
        console.log(req.body)
        let date = new Date()
        Task.findOneAndUpdate({_id: req.body._id}, 
            { $set:{
                archived: true,
                finish: date
            }
            }, {useFindAndModify: false}, (error, docs) => {
            if(error){
                console.log(getDate(), " Error archiving task: ", error)
                res.status(401)
                res.send({response: 'FAIL', reason: 'error'})
            }
            if (docs) {
                console.log(getDate(), "Archived task : ", req.body._id)
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
            Habbit.find({user : decoded.id, archived : false}, (error, docs) => {
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
    router.get('/allHabbits', (req, res) => {
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
        console.log(req.body)
        var habbit = new Habbit ({
            user: req.body.user,
            name: req.body.name,
            description: req.body.description,
            points: req.body.points,
            positive_count: req.body.positive_count,
            negative_count: req.body.negative_count,
            archived: req.body.archived,
            type: req.body.type
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
    router.post('/archiveHabbit', (req, res) => {
        console.log(req.body)
        Habbit.findOneAndUpdate({_id: req.body._id}, 
            { $set:{
                archived: true
            }
            }, {useFindAndModify: false}, (error, docs) => {
            if(error){
                console.log(getDate(), " Error archiving habbit: ", error)
                res.status(401)
                res.send({response: 'FAIL', reason: 'error'})
            }
            if (docs) {
                console.log(getDate(), "Archived habbit : ", req.body._id)
                res.status(200)
                res.send({response: 'OK'})
            }
        })
    })
    router.post('/finishHabbit', (req, res) => {
        console.log(req.body)
        Habbit.findOneAndUpdate({_id: req.body._id}, 
            { $inc:{
                positive_count : 1
            }
            }, {useFindAndModify: false}, (error, docs) => {
            if(error){
                console.log(getDate(), " Error incrementing habbit: ", error)
                res.status(401)
                res.send({response: 'FAIL', reason: 'error'})
            }
            if (docs) {
                console.log(getDate(), "Incrementing habbit : ", req.body._id)
                res.status(200)
                res.send({response: 'OK'})
            }
        })
    })
    router.post('/decrement', (req, res) => {
        console.log(req.body)
        Habbit.findOneAndUpdate({_id: req.body._id}, 
            { $inc:{
                negative_count : 1
            }
            }, {useFindAndModify: false}, (error, docs) => {
            if(error){
                console.log(getDate(), " Error incrementing habbit: ", error)
                res.status(401)
                res.send({response: 'FAIL', reason: 'error'})
            }
            if (docs) {
                console.log(getDate(), "Incrementing habbit : ", req.body._id)
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
            Daily.find({user : decoded.id, archived : false}, (error, docs) => {
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
    router.get('/allDailies', (req, res) => {
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
            done: req.body.done,
            archived: req.body.archived
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
    router.post('/archiveDaily', (req, res) => {
        console.log(req.body)
        let date = new Date()
        Daily.findOneAndUpdate({_id: req.body._id}, 
            { $set:{
                archived: true,
                finished: date
            }
            }, {useFindAndModify: false}, (error, docs) => {
            if(error){
                console.log(getDate(), " Error archiving daily: ", error)
                res.status(401)
                res.send({response: 'FAIL', reason: 'error'})
            }
            if (docs) {
                console.log(getDate(), "Archived daily : ", req.body._id)
                res.status(200)
                res.send({response: 'OK'})
            }
        })
    })
    router.post('/finishDaily', (req, res) => {
        console.log(req.body)
        let date = new Date()
        Daily.findOneAndUpdate({_id: req.body._id}, 
            { $set:{
                finished: date
            }
            }, {useFindAndModify: false}, (error, docs) => {
            if(error){
                console.log(getDate(), " Error finishing daily: ", error)
                res.status(401)
                res.send({response: 'FAIL', reason: 'error'})
            }
            if (docs) {
                console.log(getDate(), "Finished daily : ", req.body._id)
                res.status(200)
                res.send({response: 'OK'})
            }
        })
    })

}