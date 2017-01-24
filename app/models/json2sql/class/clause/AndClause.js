
const ClauseResult = require("./ClauseResult");
const Clause = require("./Clause");

module.exports = class AndClause extends Clause {
	
	init() {
		this._priority = 4;
	}
	
	getResult() {
		let result = new ClauseResult(" and ", this);
		for (let item in this.operands) {
			let clause = this.FactoryClause.create(item, this.operands[item], this);
			result.push(clause.getResult());
		}
		return result;
	}
	
};