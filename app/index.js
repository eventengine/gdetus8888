
/**
 * Зависимости 
 */

const paths = {
	controllers: `${__dirname}/controllers`,
	middlewares: `${__dirname}/middlewares`,
	models: `${__dirname}/models`
};

const path = require('path');

const vhost = require('vhost');
const express = require('express');
require('express-resource');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');

const passport = require(path.join(paths.middlewares, 'passport'));










/**
 * Приложение Express.
 */

module.exports = {
	create: function(config) {
		const app = express();
		
		app.disable('x-powered-by');
		app.set('views', path.join(__dirname, 'views'));
		app.set('view engine', 'ejs');
		app.set('models', require(paths.models));
		
		app.use(express.static(config.client.path));
		
		
		// Контроллеры обработки ошибок.
		app.use(require(path.join(paths.controllers, '404')));
		app.use(require(path.join(paths.controllers, '500')));
		
		return app;
	}
};