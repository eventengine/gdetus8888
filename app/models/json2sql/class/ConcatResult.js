
module.exports = class Result {
	
	constructor(results) {
		this._results = results || [];
	}
	
	push(result) {
		this._results.push(result);
		return this;
	}
	
	getSql() {
		return this._results.map(result => result.getSql()).join(" ");
	}
	
	getValues() {
		return this._results.filter(result => !result.isEmpty()).map(result => result.getValues()).reduce((a, b) => a.concat(b));
	}
	
	toObject(divider) {
		return {
			sql: this.getSql(),
			values: this.getValues()
		};
	}
	
};