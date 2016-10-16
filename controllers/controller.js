var Pet = require('../models/pets');
var User = require('../models/users');
var Orders = require('../models/orders');
var helper = require('../helper/response');

module.exports = {
	addPet: function (req, res, next) {
		
        (new Pet(req.body)).save(function(err, pet){
            if(err){
                res.json(helper.responseObject(422, err, null, true));
            }else {
                req.result = pet;
                next();				
            }
        });
				
	},
	getAllPets: function (req, res, next) {
		Pet.find(function(err, pets){
            if(err){
                res.json(helper.responseObject(422, err, null, true));
            }else {
                req.result = pets;
                next();				
            }
        })
	},
    register: function (req, res, next) {
		User.findOne({ 'username' :  req.body.username  }, function(err, user) {
            if (err)
                res.json(helper.responseObject(422, err, null, true));
            else if (user) {
                res.json(helper.responseObject(422, {message:'User already Registered'}, null, true));
            } else {
                var newUser = new User();
                newUser.username = req.body.username;
                newUser.password = newUser.generateHash(req.body.password);
				newUser.name = req.body.name;

                newUser.save(function(err, user) {
                    if (err)
                        res.json(helper.responseObject(422, err, null, true));
                    req.result = user
                    next();
                });
            }

        });    
	},
    getUser: function (req, res, next) {
		User.findById(req.body._id, function(err, user) {
            if (err)
                res.json(helper.responseObject(422, err, null, true));
            else {
                req.result = user
                next();
            }

        });    
	},
    login: function (req, res, next) {
		User.findOne({ 'username' :  req.body.username }, function(err, user) {
            if (err)
                res.json(helper.responseObject(422, err, null, true));
            else if (!user)
                res.json(helper.responseObject(422, {message:'Wrong password or email'}, null, true));
            else if (!user.validPassword(req.body.password))
                res.json(helper.responseObject(422, {message:'Wrong password or email'}, null, true));
            else{
                req.result = user
                next();
            }
        });    
	},
    placeOrder: function (req, res, next) {
        /**
         *  we should calculate total ( price ) cost server side not client side 
         * */
        var payload = { customer :{} };
        payload.customer.id = req.result._id;
        payload.customer.name = req.result.name
        payload.pets = req.body.pets;
        payload.total = req.body.total;
		(new Orders(payload)).save(function(err, order){
            if(err){
                res.json(helper.responseObject(422, err, null, true));
            }else {
                req.result = order;
                next();				
            }
        });    
	},
    getOrders: function (req, res, next) {
        Orders.find({'customer.id': req.result._id}).populate('pets').exec(function(err, orders){
            if(err){
                res.json(helper.responseObject(422, err, null, true));
            }else {
                req.result = orders;
                next();				
            }
        })    
	},
};
