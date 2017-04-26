
module.exports = {
	
	patch: (req, res, next) => {
		const models = req.app.get("models");
		let userId = req.params.user;
		let friendId = req.params.friend;
		models.friendship.patch(userId, friendId, req.body).then(none => {
			res.send({
				success: true
			});
		}).catch(next);
	}
	
};