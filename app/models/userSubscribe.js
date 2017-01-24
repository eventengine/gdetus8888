
const Promise = require('bluebird');
const db = require('./db');
const json2sql = require('./json2sql');

/**
 * Модель Подписка пользователя на другого пользователя.
 * Обслуживает таблицу user_subscribe.
 */
module.exports = class UserSubscribe {
	
	static select(params) {
		let where = json2sql.where(params.where);
		const sql = `
			select * from user_subscribe
			${where.getSql()}
		`;
		return db.query(sql, where.getValues()).spread(result => result);
	}
	
	/**
	 * Создание подписки подписчика user на пользователя subscribed.
	 */
	static insert(user, subscribed) {
		const sql = `insert into user_subscribe (user_id, subscribed_user_id) values (?, ?)`;
		return db.query(sql, [user, subscribed]).spread(result => {
			return this.select({
				where: {
					id: result.insertId
				}
			}).then(result => result[0]);
		});
	}
	
	/**
	 * Удаление подписки подписчика user на пользователя subscribed.
	 */
	static delete(user, subscribed) {
		const sql = `delete from user_subscribe where user_id = ? and subscribed_user_id = ?`;
		return db.query(sql, [user, subscribed]).spread(result => {
			return;
		});
	}
	
};