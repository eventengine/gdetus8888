
const Result = require("./Result");
const FactoryClause = require("./clause/FactoryClause");

module.exports = class Where {
	
	constructor(operands) {
		this.operands = operands;
	}
	
	getResult() {
		return new Result("where", FactoryClause.create("_and", this.operands));
	}
	
	
};