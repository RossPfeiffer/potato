const client = require("./connection.js")
var collectionSize = 8888888;
var promise_all=0;
var counts = []
for(let i=0;i<10;i+=1){
	counts.push(0)
}
var metapoints_by1=0
let queries = []
client.connect((err)=>{
	if(err) throw err;
	console.log("connected for rarity and metapoints task")
	
	client.query("SELECT * FROM part_usage",function(err,res,fields){
		
		res.sort(function(a,b){
			return a.used - b.used
		})

		res.forEach(row=>{
			counts[row.parttype] += 1;
			metapoints_by1 += 1;
			row.meta = metapoints_by1;
		})
		
		res.forEach(function(row,i){
			console.log(i,row.ID,"---- Used: "+row.used," ---- META: "+row.meta)
			//console.log(i,row.ID)
			let rarityFactor = collectionSize / row.used
			let rID = row.ID
			let rM = row.meta
			
			queries.push("UPDATE part_usage SET metapoints="+(rM)+",rarity_factor="+rarityFactor+"  WHERE(ID="+rID+")")
			/*client.query("UPDATE part_usage SET metapoints="+(rM)+",rarity_factor="+rarityFactor+"  WHERE(ID="+rID+")",function(){
				promise_all+=1;
				if(promise_all==728){
					client.end();
				}
			})*/
		})

		runQueries()

		
	})
})

let Q = 0;
function runQueries(){
	client.query(queries[Q],function(){
		Q+=1
		if(Q==728){
			client.end();
		}else{
			runQueries();
		}
	})
}

/*
SET @rownumber = 0;    
update potatoes set rarity_rank = (@rownumber:=@rownumber+1)
order by rarity asc
*/
