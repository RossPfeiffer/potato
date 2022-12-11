const client = require('./connection.js');
let batch = 0;
let batchSize = 10;
let p2p = [];
let m2p = [];
client.connect((e)=>{
	if(e) throw e;
	console.log("connected for applying rarity to potatoes")
	//get ... part metapoints first
	client.query("SELECT * FROM part_usage",function(err,res,fields){
		//
		res.forEach(function(part,i){
			p2p[i+1] = part.rarity_factor
			m2p[i+1] = part.metapoints
			//console.log(part.metapoints)
		})
		updateNextBatch();
	});
})

function updateNextBatch(){
	client.query("SELECT * FROM potatoes ORDER BY ID ASC LIMIT "+(batch*batchSize)+","+batchSize,(err,res,fields)=>{
		
		if(res.length==0){
			return;
		}
		
		let topSQL = 'UPDATE potatoes SET rarity = CASE ID';
		let pSQL = '';
		let mSQL = '';
		let _pSQL = ' ELSE rarity END, metascore = CASE ID';
		let _mSQL = ' ELSE metascore END WHERE (ID>'+(batch*batchSize)+' AND ID<='+((batch+1)*batchSize)+')'
		res.forEach((p)=>{
			let score = p2p[p.nose]/2 * p2p[p.mouth]/2 * p2p[p.hat]/2 * p2p[p.eyes]/2 * p2p[p.ears]/2 * p2p[p.shoes]/2 * p2p[p.background]/2 * p2p[p.leftarm]/2 * p2p[p.rightarm]/2;
			let metascore = m2p[p.nose] + m2p[p.mouth] + m2p[p.hat] + m2p[p.eyes] + m2p[p.ears] + m2p[p.shoes] + m2p[p.background] + m2p[p.leftarm] + m2p[p.rightarm];

			pSQL += ' WHEN '+p.ID+' THEN '+score
			/*let rare = p.rarity_rank;
			let gb = 0;
			if (rare<8888888/20){
				gb = 40
			}else if (rare<8888888/5){
				gb = 30
			}else if (rare<8888888/2){
				gb = 20
			}else{
				gb = 10
			}*/
			mSQL += ' WHEN '+p.ID+' THEN '+(metascore)
			
		});
		console.log("::::: Updating "+batch+':::::');
		client.query( topSQL + pSQL + _pSQL + mSQL + _mSQL , (err,res,fields)=>{
			if(err) throw err;
			console.log("Batch "+batch+" updated");
			batch+=1
			updateNextBatch();
		})
	})
}
