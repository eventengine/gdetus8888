
const Promise = require('bluebird');
const db = require('./db');
const json2sql = require('./json2sql');

/**
 * Модель Дружба пользователя.
 * Обслуживает таблицу friendship.
 */
module.exports = class Friendship {
	
	static select(params) {
		let where = json2sql.where(params.where);
		const sql = `
			select * from friendship
			${where.getSql()}
		`;
		return db.query(sql, where.getValues()).spread(result => result);
	}
	
	static insert(user, friend) {
		const sql = `insert into friendship (user_id, friend_id) values (?, ?)`;
		return db.query(sql, [user, friend]).spread(result => {
			return this.select({
				where: {
					id: result.insertId
				}
			}).then(result => result[0]);
		});
	}
	
	static delete(user, friend) {
		const sql = `delete from friendship where user_id = ? and friend_id = ?`;
		return db.query(sql, [user, friend]).spread(result => {
			return;
		});
	}
	
};