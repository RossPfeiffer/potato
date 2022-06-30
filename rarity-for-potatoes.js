const client = require('./connection.js');
let batch = 0;
let batchSize = 10000;
let p2p = [];
client.connect((e)=>{
	if(e) throw e;
	console.log("connected for applying rarity to potatoes")
	//get ... part metapoints first
	client.query("SELECT * FROM part_usage",function(err,res,fields){
		//
		res.forEach(function(part,i){
			p2p[i] = part.metapoints
			//console.log(part.metapoints)
		})
		updateNextBatch();
	});
})

function updateNextBatch(){
	client.query("SELECT * FROM potatoes ORDER BY ID ASC LIMIT "+(batch*batchSize)+","+batchSize,(err,res,fields)=>{
		//console.log(res)
		//
		if(res.length==0){
			return;
		}
		let topSQL = 'UPDATE potatoes SET rarity = CASE ID';
		let SQL = '';
		let bottomSQL = ' ELSE rarity END WHERE (ID>'+(batch*batchSize)+' AND ID<='+((batch+1)*batchSize)+')';
		res.forEach((p)=>{
			let score = p2p[p.nose] * p2p[p.mouth] * p2p[p.hat] * p2p[p.eyes] * p2p[p.ears] * p2p[p.shoes] * p2p[p.background] * p2p[p.leftarm] * p2p[p.rightarm];
			SQL += ' WHEN '+p.ID+' THEN '+score
		});
		console.log("::::: Updating "+batch+':::::');
		client.query( topSQL + SQL + bottomSQL , (err,res,fields)=>{
			if(err) throw err;
			console.log("Batch "+batch+" updated");
			batch+=1
			updateNextBatch();
		})
	})
}
