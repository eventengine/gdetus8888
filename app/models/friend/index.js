
var db = require('../db');

/**
 * Модель Друг пользователя.
 * Обслуживает таблицу friend.
 */
module.exports = class Friend {
	
	static getList(user) {
		const sql = `
			select user.* from friend
			left join users as user on (user.id = friend.friend_id)
			where user_id = ?
		`;
		return db.query(sql, [user]).spread(result => {
			return result;
		});
	}
	
	static insert(user, friend) {
		const sqlFriendInsert = `insert into friend (user_id, friend_id) values (?, ?)`;
		return db.query(sqlFriendInsert, [user, friend]).spread(result => {
			return;
		});
	}
	
	static delete(user, friend) {
		const sqlFriendDelete = `delete from friend where user_id = ? and friend_id = ?`;
		return db.query(sqlFriendDelete, [user, friend]).spread(result => {
			return;
		});
	}
	
};