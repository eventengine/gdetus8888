
module.exports = {
	create: function(config) {
		return function(req, res, next) {
			if (config.https && req.protocol === "http") {
				res.redirect(`https://${req.hostname}${req.originalUrl}`);
			} else {
				next();
			}
		};
	}
};