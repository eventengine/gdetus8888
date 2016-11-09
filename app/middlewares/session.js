
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

var sessionConfig = {
    store: {
		expiration: 604800000, // maxAge: 7 days в миллисекундах.
		createDatabaseTable: true,
		schema: {
			tableName: 'sessions',
			columnNames: {
				session_id: 'sid',
				expires: 'expires',
				data: 'data'
			}
		}
	},
    secret: "it:demo:secret",
    key: "sid",
    saveUninitialized: false,
    cookie: {
        path: "/",
        httpOnly: true,
        maxAge: null
    }
};


	
module.exports = {
	init: function(config) {
		sessionConfig.store = Object.assign({}, sessionConfig.store, config.database);
		sessionConfig.store = new MySQLStore(sessionConfig.store);
		return session(sessionConfig);
	}
};