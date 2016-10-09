
const fs = require('fs');
const path = require('path');
const yaml = require("js-yaml");

module.exports = {
	load: function(pathToConfig) {
		let config = null;
		pathToConfig = pathToConfig ? pathToConfig : __dirname + "/config.yaml";
		
		try {
			config = fs.readFileSync(pathToConfig, "utf8");
		} catch(err) {
			throw Error("Ошибка при считывании файла config.yaml: " + err.message);
		}
		
		try {
			config = yaml.safeLoad(config);
		} catch(err) {
			throw Error("Файл config.yaml имеет ошибку YAML-формата: " + err.message);
		}
		
		config.homedir = path.dirname(pathToConfig);
		
		config.client = config.client ? config.client : {};
		
		return config;
	}
};