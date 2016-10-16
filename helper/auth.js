var jwt = require('jwt-simple');
var config = require('../config/config');
var helper = require('./response');

module.exports = {
	
	authentication: function(req, res, next) {
		var iss = req.result._id;
		var token = jwt.encode({
		  iss: iss,
		  exp: config.keys.tokenExpireTime
		}, config.keys.jwtTokenSecret);
		req.result = token;
		next();
	},
	authValidation: function(req, res, next){
		var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['access_token'];
		if (token) {
			try {
				var decoded = jwt.decode(token, config.keys.jwtTokenSecret);
				if (decoded.exp <= Date.now()) {
  					res.json(helper.responseObject(400, 'Access token has expired', null));
				}else{
					req.token = token;
					req.body._id = decoded.iss;
					next();
				}
			} catch (err) {
				res.json(helper.responseObject(401, 'unauthorized', null, true));
			}
		} else {
			res.json(helper.responseObject(401, 'unauthorized', null, true));
		}
	}
}