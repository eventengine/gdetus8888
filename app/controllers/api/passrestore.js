
/**
 * Контроллер восстановления пароля.
 */

var _ = require('lodash');
var nodemailer = require('nodemailer');

module.exports = {
	
	post: function(req, res) {
		
		
		const config = req.app.get("config");
		const models = req.app.get("models");
		
		
		models.user.getUser(req.body.email).then(user => {
			let result;
			if (user) {
				result = models.user.generatePassword(user).then(function(password) {
					var subject = "gdetus.io: восстановление пароля.";
					var text = [];
					text.push('Привет! :) Говорят, ты потерял свой старый пароль. Мы придумали тебе новый, так что теперь всё в порядке!');
					text.push(`Новый пароль: ${password}`);
					text.push('С уважением, твой Гдетус!');
					var info = sendmail({
						to: user.email,
						subject: subject,
						text: text.join("\n")
					}, config);
					res.send({
						success: true,
						info: info
					});
				});
			} else {
				res.send({
					success: false,
					message: `Почта ${req.body.email} не найдена или написана с ошибкой.`
				});
			}
			return result;
		})
		.catch(function(err) {
			console.log("Проблемы при отправке письма: ", err);
			res.send({
				success: false,
				error: err
			});
		});
		
	}
	
};

function sendmail(mail, config) {
	var defaultMail = {
		from: config.nodemailer.auth.user
	};
	mail = _.merge({}, defaultMail, mail);
	var transporter = nodemailer.createTransport(config.nodemailer);
	return new Promise(function(resolve, reject) {
		transporter.sendMail(mail, function(err, info) {
			if(err) return reject(err); else return resolve(info);
		});
	});
}

