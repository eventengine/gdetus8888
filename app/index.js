
/**
 * Зависимости 
 */

const paths = {
	controllers: `${__dirname}/controllers`,
	middlewares: `${__dirname}/middlewares`,
	models: `${__dirname}/models`
};

const fs = require('fs');
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
		app.set('config', config);
		app.set('models', models);
		app.set('passport', passport);
		
		app.use(cookieParser());
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({ extended: true }));
		app.use(require(path.join(paths.middlewares, "session")).init(config));
		app.use(expressValidator({
			customValidators: require(path.join(paths.models, "validators"))
		}));
		
		// Подключаем мидлвар Паспорта.
		app.use(passport.initialize());
		app.use(passport.session());
		app.use(passport.authenticate("remember-me"));
		
		app.use(function(req, res, next) {
			res.cookie("isAuthenticated", req.isAuthenticated());
			next();
		});
		
		// Подключение JS-библиотек.
		app.use("/assets/plugins/ng-meta", express.static(path.join(path.dirname(require.resolve("ng-meta/package.json")), "dist")));
		
		// Временное подключение демо-версии фреймворка и пред. версии клиента.
		app.use("/prev", express.static(path.join(config.client.path, "prev")));
		app.use("/demo", express.static(path.join(config.client.path, "demo")));
		
		// Основные контроллеры.
		app.use("/api", require(path.join(paths.controllers, "api")));
		app.use("/file/:id", require(path.join(paths.controllers, "file")));
		
		// Подключение клиентской части.
		const clientAngularAppPath = "www";
		app.use(express.static(path.join(config.client.path, clientAngularAppPath)));
		app.use((req, res, next) => {
			res.set("Content-Type", "text/html; charset=UTF-8");
			res.send(fs.readFileSync(path.join(config.client.path, clientAngularAppPath, "index.html")));
		});
		
		// Контроллеры обработки ошибок.
		//app.use(require(path.join(paths.controllers, '404')));
		app.use(require(path.join(paths.controllers, '500')));
		
		return app;
	}
};