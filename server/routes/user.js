module.exports = (router, db, mongojs, jwt, config) => {

    router.get('/foodFull', (req, res) => {
        db.food.find({}, (error, docs) => {
            if (error) {
                throw error;
            }
            res.json(docs);
        });
    });

    router.get('/food/:name', (req, res) => {
        let fname = req.params.name

        db.food.find({ name: fname }, (error, docs) => {
            if (error) {
                throw error;
            }
            res.json(docs);
        });
    });

    router.get('/FoodMenu', (req, res) => {
        let limit = Number(req.query.limit) || 6;
        let skip = Number(req.query.skip) || 0;
        db.food.find({}).skip(skip).limit(limit, (error, docs) => {
            if (error) {
                throw error;
            }
            res.json(docs);
        });
    });
    router.get('/FoodMenu/:type', (req, res) => {
        let reqType = req.params.type;
        let limit = 6;
        let skip = Number(req.query.skip) || 0;
        db.food.find({category: reqType}).skip(skip).limit(limit,
            (error, docs) => {
                if(error){
                    console.log("Error at FoodMenu/:type", error)
                    throw error;
                }
                res.json(docs)
                res.status(200)
            })
    })

    router.post('/order/post', (req, res) => {
        let model = {
            username  : req.body.username,
            telephone : req.body.telephone,
            order : req.body.order,
            date : getDate(),
            discount : req.body.discount || 0,
            price : req.body.price,
            delivery: req.body.delivery,
            cashier: getCashier(),
            driver : getDriver(),
            paid : req.body.paid || false,
            serial_no: 'add_rand_later',
            registered : true
        }
        if(req.body.registered == false){
            model.registered = false;
            db.order.insertOne(model, (error, docs) => {
                if (error) {
                    throw error;
                }
                console.log(getDate(), "New order added for ", model.username)
                res.status(200)
                res.send({response: 'OK'})
            });
        }else {
            db.user.findOne({username : req.body.username}, (error, docs) => {
                if(error){
                    console.log(getDate(), "Error finding user in orders : ", model.username)
                }
                if(docs){
                    model.telephone = docs.telephone;
                    db.order.insertOne(model, (error, docs) => {
                        if (error) {
                            throw error;
                        }
                        console.log(getDate(), "New order added for ", model.username)
                        res.status(200)
                        res.send({response: 'OK'})
                    });
                }
            })
        }
    });

    function getCashier(){
        return "Mensur"
    }
    function getDriver(){
        return "Amir"
    }

}
