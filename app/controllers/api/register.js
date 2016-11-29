
module.exports = {
	
	/**
	 * Контроллер регистрации пользователя.
	 */
	post(req, res) {
	    var models = req.app.get("models");
	    req.checkBody(models.user.getValidateSchema());
		req.asyncValidationErrors().then(function() {
	        return models.user.registrationUser(req.body).then(function(result) {
	            res.send(result);
	        }).catch(function(err) {
	            console.error("Ошибки при регистрации пользователя:");
	            console.error(err);
	            res.send({
			        success: false,
			        message: "Ошибки при регистрации пользователя:",
			        errors: [err]
			    });
	        });
		}).catch(function(errors) {
		    res.send({
		        success: false,
		        message: `Внимание, ошибк${errors.length == 1 ? "а" : "и"} при регистрации пользователя:`,
		        errors: errors
		    });
		});
	}
	
};