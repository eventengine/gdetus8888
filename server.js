
/**
 * Зависимости.
 */

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const program = require('commander');

/**
 * Параметры запуска сервера.
 */

program
	.version('0.0.1')
	.option('-c, --config [file]', 'Конфигурационный файл приложения.')
	.parse(process.argv);


/**
 * Загрузка конфигурационного файла.
 */

const config = require("./config").load(program.config);

config.client.path = path.join(__dirname, "client");

/**
 * Создание Express-приложения.
 */

const app = require("./app").create(config);

/**
 * Запуск HTTP веб-сервера.
 */

var httpServer = http.createServer(app);
httpServer.listen(config.server.port, function () {
	console.log('HTTP-сервер Gdetus запущен на порту: ' + config.server.port);
});
httpServer.on("error", onServerError.bind(httpServer));


/**
 * Запуск HTTPS веб-сервера.
 */

if (config.https) {
	// http://stackoverflow.com/questions/5998694/how-to-create-an-https-server-in-node-js
	var keyFileNames = config.https.keys;
	var privateKey  = fs.readFileSync(path.join(config.homedir, keyFileNames.private), 'utf8');
	var certificateKey = fs.readFileSync(path.join(config.homedir, keyFileNames.public), 'utf8');
	var rootKey = fs.readFileSync(path.join(config.homedir, keyFileNames.root), 'utf8');
	
	var credentials = { key: privateKey, cert: certificateKey, ca: rootKey, requestCert: false, rejectUnauthorized: false };
	
	var httpsServer = https.createServer(credentials, app);
	httpsServer.listen(config.https.port, function () {
		console.log('HTTPS-сервер Gdetus запущен на порту: ' + config.https.port);
	});
	httpsServer.on("error", onServerError.bind(httpsServer));
}

/**
 * Вспомогательные функции.
 */

function onServerError(err) {
	if (err.syscall == "listen") {
		var bind = getBind(this.address());
		console.error("Внимание, сервер не запущен.");
		console.error({
			EACCES: `Адрес ${bind} требует повышенных привилегий.`,
			EADDRINUSE: `Адрес ${bind} уже используется.`
		}[err.code] || "Неизвестная ошибка.");
		console.error(err);
	}
}

function getBind(addr) {
	if (!addr) return "<not address>";
	if (typeof addr === "string") return `Pipe ${addr}`;
	switch (addr.family) {
		case "IPv6": return `[${addr.address}]:${addr.port}`;
		case "IPv4": return `${addr.address}:${addr.port}`;
	}
}