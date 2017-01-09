
var Promise = require('bluebird');

var fs = require('fs');
var path = require('path');
var db = require('../db');
var File = require('../file');
var Friend = require('../friend');

var User = module.exports = {};
Object.assign(User, require("./validation"));
Object.assign(User, require("./password"));
Object.assign(User, require("./geoLocation"));
Object.assign(User, require("./registration"));
Object.assign(User, require("./get"));

/**
 * Перечисление всех полей в профиле пользователя.
 */
User.fieldNames = [
    "firstname",
    "nickname", 
    "lastname", 
    "useruri", 
    "email", 
    "password", 
    "salt", 
    "birthday_date",
    "birthday_date_muted", 
    "avatar_id", 
    "avatar_preview_id", 
    "location_lon", 
    "location_lat", 
    "chevron", 
    "gender"
];

/**
 * Перечисление полей, значения которых доступны всем, 
 * кто знает id пользователя.
 */
User.publicFieldNames = [
	"id",
	"useruri",
	"email",
	"firstname",
	"lastname",
	"gender",
	"birthday_date",
	"birthday_date_muted",
	"useruri",
	"avatar_id",
	"avatar_preview_id", 
    "location_lon", 
    "location_lat", 
	"chevron"
];

User.getPublicFields = function(user) {
	const publicUser = {};
	this.publicFieldNames.forEach(fieldName => publicUser[fieldName] = user[fieldName]);
	return publicUser;
};

/**
 * Обновление данных пользователя.
 */
User.update = function(userId, data) {
    var fieldNames = User.fieldNames;
    
    var existsFieldNames = [];
    fieldNames.forEach(function(fieldName) {
        if (fieldName in data) existsFieldNames.push(fieldName);
    });
    
    // Checkboxes fields
    existsFieldNames.push("birthday_date_muted");
    
    var setStatement = existsFieldNames.map(function(fieldName) {
        return `${fieldName} = ?`;
    }).join(", ");
    
    var values = [];
    existsFieldNames.forEach(function(fieldName) {
        var value = data[fieldName];
        if (fieldName == "birthday_date") {
            value = new Date(value);
            value = isNaN(value.getFullYear()) ? null : value;
        }
        values.push(value);
    });
    values.push(userId);
    
    if (setStatement) {
        return db.query(`update users set ${setStatement} where id = ?`, values).spread(function() {
            return User.getUserById(userId);
        });
    } else {
        return User.getUserById(userId);
    }
};

/**
 * Обновление аватара и фона на странице пользователя.
 * @param {Number} userId
 * @param {String} fileType = Avatar | AvatarBackground
 * @param {String} filepath
 */
User.updateFile = function(userId, fileType, filepath) {
    var fileIdFieldName = { Avatar: "avatar_id", AvatarBackground: "avatar_bg_id" }[fileType];
    return db.query("select ?? as file_id from users where id = ?", [fileIdFieldName, userId]).spread(rows => {
        return rows[0]["file_id"];
    }).then(fileId => {
        if (fileId) {
            return File.update(fileId, filepath);
        } else {
            return File.insert(filepath).then(fileId => {
                return db.query("update users set ?? = ? where id = ?", [fileIdFieldName, fileId, userId]);
            });
        }
    });
};
