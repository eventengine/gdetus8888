
/*
	where: {
		_gt: {
			var1: 111
		},
		var2: 111,
		var3: 111
	}
	
	var1 > 111 and var2 == 111 and var3 == 111
	
	
	where: {
		var1: 111,
		var2: 111,
		_or: {
			var1: 111,
			var2: 111
		}
	}
	
	var1 == 111 and var2 == 111 and (var1 == 111 or var2 == 111)
*/

// Прототип https://github.com/roackb2/j2s

const Where = require("./class/Where");
const Limit = require("./class/Limit");
const ConcatResult = require("./class/ConcatResult");
const SqlPartial = require("./class/SqlPartial");


module.exports = class {
	
	static partial(params) {
		return new SqlPartial(params).getResult();
	}
	
	static where(json) {
		return new Where(json).getResult();
	}
	
	static limit(json) {
		return new Limit(json).getResult();
	}
	
	static concat(results) {
		if (arguments.length > 1) results = [].slice.call(arguments);
		return new ConcatResult(results);
	}
	
};


// ТЕСТИРОВАНИЕ МОДУЛЯ
/*let test = {
	_gt: {
		var1: 111
	},
	var2: 222,
	var3: 333,
	_or: {
		var4: 444,
		var5: 555,
		_and: {
			var11: 110,
			var22: 220
		}
	},
	var6: 666
};

let clause1 = new Where(test);

console.log("Where", clause1.getResult().getSql());
console.log("Where", clause1.getResult().getValues());

let clause2 = new Limit(1000);

console.log("Limit", clause2.getResult().getSql());
console.log("Limit", clause2.getResult().getValues());


let concat = new ConcatResult([clause1.getResult(), clause2.getResult()]);

console.log("ConcatResult", concat.getSql());
console.log("ConcatResult", concat.getValues());

process.exit(0);*/

