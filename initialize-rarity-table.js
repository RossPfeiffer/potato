const client = require('./connection.js')
const parser = require('simple-excel-to-json')
var doc = (parser.parseXls2Json('./parts-list.xlsx'))[0];

let sql = 'INSERT INTO part_usage () VALUES'
doc.forEach( (x,i) => {
	sql += ' ()'
	if(i!=doc.length){
		sql += ','
	}
})

client.connect( function(err){
	if(err) throw err;
	//client.query(sql);
	doc.forEach((x) => {
		if(x.PartType!==''){

			client.query('INSERT INTO part_usage () VALUES ()');
		}
	})
})
