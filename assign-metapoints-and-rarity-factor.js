const client = require("./connection.js")
var collectionSize = 8888888;
client.connect((err)=>{
	if(err) throw err;
	console.log("connected for rarity and metapoints task")
	
	client.query("SELECT * FROM part_usage",function(err,res,fields){
		//
		//console.log(res)
		res.sort(function(a,b){return a.used-b.used})
		res.forEach(function(row,i){
			console.log(i,row.ID,"used: "+row.used)
			let rarityFactor = collectionSize / row.used
			client.query("UPDATE part_usage SET metapoints="+(res.length-i)+",rarity_factor="+rarityFactor+"  WHERE(ID="+row.ID+")")
		})
	})
})
