
module.exports = {
	
	get: function(req, res) {
		
		if (req.params.id == "authenticated") {
			
			const result = { success: true };
			
			if (req.isAuthenticated()) result.user = publicUser(req.user);
			
			res.send(result);
			
		} else {
			
		}
		
	}
	
};


const publicFields = [
	"email",
	"firstname",
	"lastname", 
	"useruri",
	"avatar_id",
	"avatar_bg_id"
];


function publicUser(user) {
	const publicUser = {};
	publicFields.forEach(fieldName => publicUser[fieldName] = user[fieldName]);
	return publicUser;
}


