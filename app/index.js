
/**
 * Зависимости 
 */

const paths = {
	controllers: `${__dirname}/controllers`,
	middlewares: `${__dirname}/middlewares`,
	models: `${__dirname}/models`,
	api: `${__dirname}/controllers/api`
};

const path = require('path');

const vhost = require('vhost');
const express = require('express');
require('express-resource');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');


/**
 * Приложение Express
 */

module.exports = {
	create: function(config) {
		const app = express();
		
		const models = require(paths.models).init(config.database);
		const passport = require(path.join(paths.middlewares, 'passport'))(config, models);
		
		app.disable('x-powered-by');
		app.set('views', path.join(__dirname, 'views'));
		app.set('view engine', 'ejs');
		app.set('models', models);
		app.set('passport', passport);
		
		app.use(cookieParser());
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({ extended: true }));
		app.use(require(path.join(paths.middlewares, "session")).init(config));
		
		// Подключаем мидлвар Паспорта.
		app.use(passport.initialize());
		app.use(passport.session());
		app.use(passport.authenticate("remember-me"));
		
		app.use(function(req, res, next) {
			res.cookie("isAuthenticated", req.isAuthenticated());
			next();
		});
		
		app.use(express.static(config.client.path));
		
		
		
		
		app.use("/api", require(paths.api));
		
		// Контроллеры обработки ошибок.
		app.use(require(path.join(paths.controllers, '404')));
		app.use(require(path.join(paths.controllers, '500')));
		
		return app;
	}
};