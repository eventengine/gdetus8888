
const ClauseResult = require("./ClauseResult");
const Clause = require("./Clause");

module.exports = class OrClause extends Clause {
	
	init() {
		this._priority = 3;
	}
	
	getResult() {
		let result = new ClauseResult(" or ", this);
		for (let item in this.operands) {
			let clause = this.FactoryClause.create(item, this.operands[item], this);
			result.push(clause.getResult());
		}
		return result;
	}
	
};