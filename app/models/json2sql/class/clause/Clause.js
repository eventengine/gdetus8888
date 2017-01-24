
const ClauseResult = require("./ClauseResult");

module.exports = class Clause {
	
	constructor(operands, FactoryClause, parent) {
		this._priority = 0;
		this._parent = parent;
		this.operands = operands;
		this.FactoryClause = FactoryClause;
		this.init();
	}
	
	init() {}
	
	get priority() {
		return this._priority;
	}
	
	get parent() {
		return this._parent;
	}
	
	getResult() {
		let result = new ClauseResult(this);
		return result;
	}
	
};