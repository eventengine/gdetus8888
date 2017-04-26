
const _ = require('lodash');
const db = require('../db');
const json2sql = require('../json2sql');
const Promise = require('bluebird');
const Friendship = require('../friendship');
const FriendRequest = require('../friendRequest');
const UserSubscribe = require('../userSubscribe');

var User = module.exports = {};

/**
 * Пользователь1.ПолучитьСписокДрузей()
 */
User.selectFriends = function(user, params) {
	let defaultParams = {
		where: {
			user_id: user
		}
	};
	let sqlPartialTotal = json2sql.partial(defaultParams);
	let sqlPartial = json2sql.partial(_.merge(params || {}, defaultParams));
	const sqlTotal = `
		select count(*) as count from friendship 
		${sqlPartialTotal.getSql()}
	`;
	const sql = `
		select user.* from friendship
		left join users as user on (user.id = friendship.friend_id)
		${sqlPartial.getSql()}
	`;
	
	
	
	return Promise.all([
		db.query(sqlTotal, sqlPartialTotal.getValues()).spread(result => result[0].count),
		db.query(sql, sqlPartial.getValues()).spread(result => result)
	]).then(([total, data]) => {
		return {
			success: true,
			total, 
			data 
		};
	}).catch(err => {
		err.sql = sql;
		throw err;
	});
};

/**
 * Получить список пользователей, которым были посланы заявки (исходящие заявки) в друзья от Пользователь1.
 * Получить список пользователей, которые подали заявки в друзья к Пользователь1.
 * @param {String} params.where.requestType Тип заявки = incoming | outgoing
 */
User.selectFriendRequestUsers = function(user, params) {
	let requestType = params.where.requestType;
	delete params.where.requestType;
	let defaultParams = {
		where: {
			[`friend_request.${{ incoming: "friend", outgoing: "user" }[requestType]}_id`]: user
		}
	};
	let sqlPartialTotal = json2sql.partial(defaultParams);
	let sqlPartial = json2sql.partial(_.merge(params || {}, defaultParams));
	const sqlTotal = `
		select count(*) as count from friend_request 
		${sqlPartialTotal.getSql()}
	`;
	const sql = `
		select ${{ incoming: "user", outgoing: "friend" }[requestType]}.* 
		from friend_request
		left join users as user on (user.id = friendship.user_id)
		left join users as friend on (friend.id = friendship.friend_id)
		${sqlPartial.getSql()}
	`;
	return Promise.all([
		db.query(sqlTotal, sqlPartialTotal.getValues()).spread(result => result[0].count),
		db.query(sql, sqlPartial.getValues()).spread(result => result)
	]).then(([total, data]) => {
		return {
			success: true,
			total, 
			data 
		};
	});	
};

/**
 * Пользователь1.ОтправитьЗаявкуК(Пользователь2)
 * Создается заявка в друзья от Пользователь1 к Пользователь2
 * Если дружба уже существует, то заявка не создается.
 * 1) Создается заявка в друзья от Пользователь1 к Пользователь2
 */
User.createFriendRequest = function(user, friend) {
	return Friendship.select({
		where: {
			user_id: user,
			friend_id: friend
		}
	}).then(result => !!result[0]).then(hasFriendship => {
		if (hasFriendship) {
			return {
				success: false,
				message: "Дружба уже существует. Заявка не создается."
			};
		} else {
			return FriendRequest.insert(user, friend).then(data => {
				return {
					success: true,
					data
				};
			});
		}
	});
};

/**
 * Пользователь1.ПринятьЗаявкуОт(Пользователь2)
 * Принимается заявка в друзья от Пользователь2 (user) к Пользователь1 (friend)
 * При этом:
 * 1) Заявка от Пользователь2 к Пользователь1 удаляется.
 * 2) Создается подписка Пользователь2 на Пользователь1
 * 3) Создается подписка Пользователь1 на Пользователь2
 * 4) Создается дружба Пользователь2 с Пользователь1
 * 5) Создается дружба Пользователь1 с Пользователь2
 */
User.acceptFriendRequest = function(user, friend) {
	return Promise.all([
		FriendRequest.delete(user, friend),
		UserSubscribe.insert(user, friend),
		UserSubscribe.insert(friend, user),
		Friendship.insert(user, friend),
		Friendship.insert(friend, user)
	]).then(result => {
		return {
			success: true
		};
	});
};

/**
 * Пользователь1.ОтклонитьЗаявкуОт(Пользователь2)
 * Отклоняется заявка в дружбу от Пользователь2 (user) к Пользователь1 (friend)
 * При этом:
 * 1) Заявка от Пользователь2 к Пользователь1 удаляется.
 * 2) Создается подписка Пользователь2 на Пользователь1
 */
User.rejectFriendRequest = function(user, friend) {
	return Promise.all([
		FriendRequest.delete(user, friend),
		UserSubscribe.insert(user, friend)
	]).then(result => {
		return {
			success: true
		};
	});
};

/**
 * Пользователь1.УдалитьДруга(Пользователь2)
 * Удаляется дружба Пользователь1 с Пользователь2
 * При этом:
 * 1) Удаляется подписка Пользователь1 на Пользователь2
 * 2) Удаляется дружба Пользователь2 с Пользователь1
 * 3) Удаляется дружба Пользователь1 с Пользователь2
 */
User.deleteFriend = function(user, friend) {
	return Promise.all([
		UserSubscribe.delete(user, friend),
		FriendRequest.delete(user, friend),
		FriendRequest.delete(friend, user)
	]).then(result => {
		return {
			success: true
		};
	});
};

/**
 * Пользователь1.ОтписатьсяОт(Пользователь2)
 * Удаление подписки подписчика user на пользователя subscribed.
 */
User.deleteSubscribe = function(user, subscribed) {
	return Promise.all([
		UserSubscribe.delete(user, subscribed)
	]).then(result => {
		return {
			success: true
		};
	});
};