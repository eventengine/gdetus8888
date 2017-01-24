
const Promise = require('bluebird');
const db = require('./db');
const json2sql = require('./json2sql');

/**
 * Модель Заявка в друзья.
 * Обслуживает таблицу friend_request.
 */
module.exports = class FriendRequest {
	
	static select(params) {
		let where = json2sql.where(params.where);
		const sql = `
			select * from friend_request
			${where.getSql()}
		`;
		return db.query(sql, where.getValues()).spread(result => result);
	}
	
	/**
	 * Создать заявку в друзья от user к friend.
	 */
	static insert(user, friend) {
		const sql = `insert into friend_request (user_id, friend_id) values (?, ?)`;
		return db.query(sql, [user, friend]).spread(result => {
			return this.select({
				where: {
					id: result.insertId
				}
			}).then(result => result[0]);
		});
	}
	
	/**
	 * Удалить заявку в друзья от user к friend.
	 */
	static delete(user, friend) {
		const sql = `delete from friend_request where user_id = ? and friend_id = ?`;
		return db.query(sql, [user, friend]).spread(result => {
			return;
		});
	}
	
};