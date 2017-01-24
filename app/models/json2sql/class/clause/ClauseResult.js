
const Clause = require("./Clause");

module.exports = class ClauseResult {
	
	constructor(divider, ownerClause) {
		if (divider instanceof Clause) {
			ownerClause = divider;
			divider = "";
		}
		this._ownerClause = ownerClause;
		this.sql = [];
		this.values = [];
		this.divider = divider;
	}
	
	get ownerClause() {
		return this._ownerClause;
	}
	
	join(divider) {
		this.sql = this.sql.join(divider);
		return this;
	}
	
	push(sql, values) {
		if (sql instanceof this.constructor) {
			values = sql.getValues();
			sql = sql.getSql();
		}
		this.sql.push(sql);
		this.values = this.values.concat(values);
	}
	
	getSql(divider) {
		let result = this.sql.join(divider || this.divider);
		let ownerClause = this.ownerClause;
		let parentClause = this.ownerClause.parent;
		return parentClause && ownerClause.priority < parentClause.priority && this.sql.length > 1 ? `(${result})` : result;
	}
	
	isEmpty() {
		return !this.sql.length;
	}
	
	getValues() {
		return this.values;
	}
	
	toObject(divider) {
		return {
			sql: this.getSql(divider),
			values: this.getValues()
		};
	}
	
};