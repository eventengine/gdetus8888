
const ClauseResult = require("./ClauseResult");
const Clause = require("./Clause");

module.exports = class EqClause extends Clause {
	
	getResult() {
		let result = new ClauseResult(this);
		for (let item in this.operands) result.push(`${item} = ?`, this.operands[item]);
		return result;
	}
	
};