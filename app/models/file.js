
"use strict";

var fs = require('fs');
var path = require('path');
var mime = require('mime');
var _ = require('lodash');
var db = require('./db');

var File = module.exports = {};

/**
 * Вспомогательная функция загрузки файла в буфер.
 * @return Promise (Buffer)
 */
function loadFile(filepath) {
    return new Promise(function(resolve, reject) {
        fs.open(filepath, "r", function(status, fd) {
            if (status) reject(status); else resolve(fd);
        });
    }).then(function(fd) {
        return new Promise(function(resolve, reject) {
            var filesize = fs.statSync(filepath).size;
            var buffer = new Buffer(filesize);
            fs.read(fd, buffer, 0, filesize, 0, function(err, num) {
                if (err) reject(err); else resolve(buffer);
            });
        });
    });
}

File.getFile = function(id) {
    return db.query(`select * from files where id = ?`, [id]).spread(function(rows) {
        return rows[0] ? {
            content: rows[0].content,
            ext: rows[0].ext,
            mime: mime.lookup(rows[0].ext)
        } : null;
    });
};

/**
 * Вставить пачку файлов (или один файл).
 * Файлы вставляются с диска.
 * @param {Object[] | Object} files
 * @param file.fieldName - same as name - the field name for this file
 * @param file.originalFilename - the filename that the user reports for the file
 * @param file.path - the absolute path of the uploaded file on disk
 * @param file.headers - the HTTP headers that were sent along with this file
 * @param file.size - size of the file in bytes
 * Взято из https://www.npmjs.com/package/multiparty
 * @return Promise(files) | Object(file)
 * @return file.field_name
 * @return file.original_filename
 * @return file.size
 * @return file.id
 */
File.insert = function(files) {
	let result;
	if (_.isArray(files)) {
		result = [];
		files.forEach(file => {
	    	result.push(this.insertOneFile(file));
	    });
	    result = Promise.all(result);
	} else {
		result = this.insertOneFile(files);
	}
    return result;
};

File.insertOneFile = function(file) {
    return loadFile(file.path).then(buffer => {
    	file.ext = path.extname(file.path);
    	return this.insertOneFileFromBuffer(buffer, file);
    });
};

File.insertOneFileFromBuffer = function(buffer, options) {
	options = typeof options == "string" ? { ext: options } : options;
    return db.query(`
    	insert into files set 
    	content = ?, 
    	ext = ?, 
    	field_name = ?, 
    	original_filename = ?, 
    	size = ?
    `, [buffer, options.ext, options.fieldName || "", options.originalFilename || "", options.size || buffer.length])
    	.spread(result => result.insertId)
    	.then(insertId => {
    		return db.query(`
    			select * from files 
    			where id = ?
    		`, [insertId]).spread(file => file[0]);
    	});
};

File.update = function(id, filepath) {
    return loadFile(filepath).then(function(buffer) {
        var ext = path.extname(filepath);
        var sql = `update files set content = ?, ext = ? where id = ?`;
        return db.query(sql, [buffer, ext, id]).spread(function() {
            return;
        });
    });
};

File.delete = function(id) {
    
};