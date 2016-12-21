
"use strict";

var db = require('../db');

var User = module.exports = {};

/**
 * Сохранение текущих координат пользователя.
 */
User.setLocation = function(userId, location) {
    var User = this;
    var sql = `update users set location_lat = ?, location_lon = ? where id = ?`;
    return db.query(sql, [location.lat, location.lon, userId]).spread(function() {
        return User.getUserById(userId);
    });
};