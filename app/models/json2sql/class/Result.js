
module.exports = class Result {
	
	constructor(prefix, clause) {
		this._prefix = prefix;
		this._clause = clause;
	}
	
	isEmpty() {
		return this._clause.getResult().isEmpty();
	}
	
	getSql() {
		let clauseResult = this._clause.getResult();
		return clauseResult.isEmpty() ? "" : `${this._prefix} ${clauseResult.getSql()}`;
	}
	
	getValues() {
		return this._clause.getResult().getValues();
	}
	
	toObject(divider) {
		return {
			sql: this.getSql(),
			values: this.getValues()
		};
	}
	
};