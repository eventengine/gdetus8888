
module.exports = function (shipit) {
	
	require('shipit-deploy')(shipit);
	
	const config = require("./shipitfile.config");
	
	var app = config.app;
	
	shipit.initConfig({
		default: Object.assign({
			workspace: `/tmp/${app.folder}`,
			deployTo: `/${app.folder}`,
			repositoryUrl: app.repository
		}, config.default),
		gdetus: config.gdetus
	});
	
	/**
	 * Задачи перед началом rollback.
	 */
	shipit.on('rollback', function () {
		shipit.start('gdetus-stop');
	});
	
	/**
	 * Задачи перед началом развертывания приложения.
	 */
	shipit.on('deploy', function () {
		shipit.start('gdetus-stop');
	});
	
	/**
	 * Задачи после rollback.
	 */
	shipit.on('rollbacked', function () {
		shipit.start('gdetus-start');
	});
	
	/**
	 * Задачи после развертывания приложения.
	 */
	shipit.on('deployed', function () {
		shipit.start(['gdetus-prepare', 'gdetus-start']);
	});
	
	/**
	 * Задача: Останов приложения при помощи PM2.
	 * Внимание, пользователь должен иметь доступ к команде sudo без ввода пароля
	 * либо необходимо заходить под суперпользователем root.
	 */
	shipit.task("gdetus-stop", function() {
		return shipit.remote(`sudo pm2 delete "${app.name}"`).catch(function() {});
	});
	
	/**
	 * Задача: Подготовка приложения перед запуском.
	 * Восстановление папки node_modules командой npm install.
	 */
	shipit.blTask("gdetus-prepare", function() {
		return shipit.remote(`cd ${shipit.config.deployTo}/current && sudo npm install`);
		//return shipit.remote(`cd ${shipit.config.deployTo}/current && npm install --link --production`);
		
		// Для нерутового пользователя нет доступа в папку /usr/lib/node_modules
		// Поэтому он не может ставить туда линки (командой npm install --link)
		
	});
	
	/**
	 * Задача: Запуск приложения при помощи PM2.
	 * Внимание, пользователь должен иметь доступ к команде sudo без ввода пароля
	 * либо необходимо заходить под суперпользователем root.
	 */
	shipit.blTask("gdetus-start", function() {
		var options = {
			pm2: [`--name="${app.name}"`],
			gdetus: [`-c ${shipit.config.deployTo}/config.yaml`]
		};
		var commands = [
			`cd ${shipit.config.deployTo}/current`, 
			`sudo pm2 start ${options.pm2.join(" ")} server.js -- ${options.gdetus.join(" ")}`
		];
		return shipit.remote(commands.join(" && "));
	});
	
	/**
	 * Задача: Запустить приложение.
	 */
	shipit.task("start", function() {
		shipit.start('gdetus-start');
	});
	
	/**
	 * Задача: Останов приложения.
	 */
	shipit.task("stop", function() {
		return shipit.remote(`sudo pm2 stop "${app.name}"`).catch(function() {});
	});
	
	/**
	 * Задача: Статус приложения.
	 */
	shipit.task("status", function() {
		return shipit.remote(`sudo pm2 list`).catch(function() {});
	});
	
};
