const client = require('./connection.js')
client.connect( function(err){
	if(err) throw err;
	client.query("SELECT metascore FROM potatoes ORDER BY metascore DESC LIMIT 0,1",function(err,res,fields){
		if(err) throw err;
		res[0].metascore
		client.end();
	});
})
