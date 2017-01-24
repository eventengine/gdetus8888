
const Result = require("./Result");
const LimitClause = require("./LimitClause");

module.exports = class Limit {
	
	constructor(operands) {
		this.operands = operands;
	}
	
	getResult() {
		return new Result("limit", new LimitClause(this.operands));
	}
	
};