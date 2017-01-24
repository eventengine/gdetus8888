
const OrClause = require("./OrClause");
const AndClause = require("./AndClause");
const EqClause = require("./EqClause");
const GtClause = require("./GtClause");

module.exports = class FactoryClause {
	
	static create(operator, operands, parent) {
		let result;
		
		if (operator[0] == "_") {
			operator = operator.substring(1);
		} else {
			let _operands = {};
			_operands[operator] = operands;
			operands = _operands;
			operator = "eq";
		}
		
		switch(operator) {
			case "or": result = new OrClause(operands, this, parent); break;
			case "and": result = new AndClause(operands, this, parent); break;
			case "eq": result = new EqClause(operands, this, parent); break;
			case "gt": result = new GtClause(operands, this, parent); break;
			default: throw new Error(`Неизвестный оператор "${operator}".`);
		}
		
		return result;
	}
	
};