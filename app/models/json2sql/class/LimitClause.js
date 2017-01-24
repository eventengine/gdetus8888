
const ClauseResult = require("./clause/ClauseResult");
const Clause = require("./clause/Clause");

module.exports = class LimitClause extends Clause {
	
	getResult() {
		let result = new ClauseResult(this);
		result.push(`?`, this.operands);
		return result;
	}
	
};