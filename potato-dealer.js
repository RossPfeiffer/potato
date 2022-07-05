function PotatoDealer(client){
	this.queries = [];
	this.client = client;
	//{ type:true, p:[0,1,2,3,4], callBack:f() }
	//{ type:false, p:5, callBack:f() }
}

PotatoDealer.prototype.stask = function(T,p,f){
	this.queries.push({type:T,p:p,f:f})
	if(this.queries.length == 1){
		this.next();
	}
};

PotatoDealer.prototype.next = function(){
	//construct query
	let work = this.queries.shift();
	let query = '';
	if(work.type){
		query += 'INSERT INTO bridge (ID) VALUES ';
		work.p.forEach((ID,i)=>{
			query += '('+ID+')'
			if(i!==p.length-1){
				query += ','
			}
		})
	}else{
		query += 'SELECT FROM bridge WHERE';
	}

	this.client.query(query,function(){
		//
	})
};

module.exports = PotatoDealer