var moment = require('moment');

module.exports = {
	'keys': {
		'tokenExpireTime' : moment().add(1, 'days').valueOf(),
		'jwtTokenSecret' : 'YOUR_SECRET'
	}
};
