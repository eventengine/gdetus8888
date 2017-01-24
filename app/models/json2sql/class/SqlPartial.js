
const Where = require("./Where");
const Limit = require("./Limit");
const ConcatResult = require("./ConcatResult");

module.exports = class SqlPartial {
	
	constructor(params) {
		this._params = params || {};
	}
	
	getResult() {
		let result = new ConcatResult();
		if ("limit" in this._params) result.push(new Limit(this._params.limit).getResult());
		if ("where" in this._params) result.push(new Where(this._params.where).getResult());
		return result;
	}
	
};