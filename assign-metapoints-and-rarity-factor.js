const client = require("./connection.js")
var collectionSize = 8888888;
var promise_all=0;
var counts = []
for(let i=0;i<10;i+=1){
	counts.push(0)
}
client.connect((err)=>{
	if(err) throw err;
	console.log("connected for rarity and metapoints task")
	
	client.query("SELECT * FROM part_usage",function(err,res,fields){
		//console.log(res)
		res.sort(function(a,b){
			return a.used-b.used
		})

		res.forEach(row=>{
			counts[row.parttype] += 1;
			row.meta = counts[row.parttype]
		})
		
		res.forEach(function(row,i){
			console.log(i,row.ID,"used: "+row.used)
			let rarityFactor = collectionSize / row.used
			client.query("UPDATE part_usage SET metapoints="+(row.meta)+",rarity_factor="+rarityFactor+"  WHERE(ID="+row.ID+")",function(){
				promise_all+=1;
				if(promise_all==728){
					client.end();
				}
			})
		})
		//
	})
})