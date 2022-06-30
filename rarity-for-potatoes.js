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
			p2p[i+1] = part.metapoints
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
			let score = p2p[p.nose] * p2p[p.mouth] * p2p[p.hat] /100 * p2p[p.eyes] * p2p[p.ears] * p2p[p.shoes]/100 * p2p[p.background] * p2p[p.leftarm] * p2p[p.rightarm];
			//console.log("============\n==========\n=========\n",p.nose,p.mouth,p.hat,p.eyes,p.ears,p.shoes,p.background,p.leftarm,p.rightarm)
			//console.log("Score "+p.ID+":::: ", score)
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
