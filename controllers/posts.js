var Pet = require('../models/pets');
var User = require('../models/users');
var Post = require('../models/posts');
var helper = require('../helper/response');

module.exports = {
	createPost: function (req, res, next) {
		
        payload = {};
        payload.user = req.result._id;
        payload.text = req.body.text;
        if(req.body.image)
            payload.image = req.body.image;
        (new Post(payload)).save(function(err, post){
            if(err){
                res.json(helper.responseObject(422, err, null, true));
            }else {
                req.result = post;
                next();				
            }
        });
				
	}
};
