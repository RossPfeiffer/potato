const client = require('./connection.js')
const parser = require('simple-excel-to-json')
var doc = (parser.parseXls2Json('./parts-list.xlsx'))[0];
let sum =0
let sql = 'INSERT INTO part_usage (parttype) VALUES'

doc.forEach( (x,i) => {
	let PartType = x.PartType
	if(PartType!==''){
		sql += ' ('+PartType+')'
		if(i!==doc.length-1 && doc[i+1].PartType!==''){
			sum +=1;
			sql += ','
			if(sum>728){
				console.log('wtf is this?',x)
			}
		}
	}
})

client.connect( function(err){
	if(err) throw err;
	//client.query(sql);
	//let q = '';
	console.log("There are "+sum+" different parts");
	console.log("Initializing Rarity table with\n "+sql)

	client.query(sql,function(err,res,fields){
		console.log("Rarity Table Initialized")
		client.end();
	});
})
