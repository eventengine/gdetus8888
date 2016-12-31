


// https://habrahabr.ru/post/229743/
// https://www.npmjs.com/package/multiparty
var multiparty = require('multiparty');
//var sharp = require('sharp');

module.exports = {
	
	/* перенесли в user
	crop: (req, res, next) => {
		var models = req.app.get("models");
		
		// https://github.com/lovell/sharp
		
		

		
		models.file.getFile(req.body.id).then(function(file) {
			
			
			// file.mime
			// file.content
			
			
			
			sharp(file.content).resize(100).jpeg().toBuffer().then(buffer => {
				models.file.insertOneFileFromBuffer(buffer, "jpg").then(file => {
					res.send({
						success: true,
						file
					});
				});
			});
			

			
		});
		
		
	},*/
	
	/**
	 * Добавление любых файлов во временное хранилище (например при создании аватара или приложение к письму).
	 * На выходе клиент получает список (id, field_name) файлов, которые потом используются.
	 * При использовании файлов следует не забыть их статус выставить в permanent, потому что по умолчанию 
	 * их статус равен temporary (автоматический уборщик такие файлы удаляет на следующий день после создания).
	 */
	post: (req, res, next) => {
		var form = new multiparty.Form();
		var models = req.app.get("models");
		
		multipartyParse(form, req)
		
			.then(([fields, files]) => {
				
				var result = [];
				
				for (let fieldname in files) {
					files[fieldname].forEach(file => {
						// file.fieldName - same as name - the field name for this file
						// file.originalFilename - the filename that the user reports for the file
						// file.path - the absolute path of the uploaded file on disk
						// file.headers - the HTTP headers that were sent along with this file
						// file.size - size of the file in bytes
						// Взято из https://www.npmjs.com/package/multiparty
						result.push(models.file.insert(file));
					});
				}
				
				// Возвращает: field_name, original_filename, size.
				return Promise.all(result);
				
			})
			
			.then(files => {
				return files.map(file => { 
					return {
						fieldName: file.field_name, 
						id: file.id 
					};
				});
			})
			
			.then(files => {
				res.send({
					success: true,
					files
				});
			})
			
			.catch(next);
		
	}
	
};

function multipartyParse(form, req) {
	return new Promise((resolve, reject) => {
		form.parse(req, function(err, fields, files) {
			if (err) reject(err); else resolve([fields, files]);
		});
	});
}