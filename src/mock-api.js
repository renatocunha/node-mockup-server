var express = require('express'),
	bodyParser = require('body-parser'),
	cors = require('cors'),
	app = express(),
	port = 4000,
	fileSystem = require('fs');

let artifacts = [];

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json())

app.post('/v1/artifact', function(req, res){
	const file = JSON.stringify(req.body);
	const path = './artifacts/' + req.body.uuid + '.json';
	try{
		fileSystem.writeFileSync(path,file);
		res.status(201).send({status: "SUCCESS"});
	}catch(err){
		console.error(err);
		res.status(500).send({status: "ERROR"})
	}
});


app.get('/v1/artifacts', function(req, res){
	//todo list all artifacts and return 
	console.log('All Artifacts');
	
});


app.get('/v1/artifact/:uuid', function(req, res){
	let f = './artifacts/'+ req.params.uuid + '.json';
	fileSystem.readFile(f,'utf8',function(err, json){
		if (err){
			res.status(500).json(JSON.parse(err));
		}

		let obj = JSON.parse(json);
		res.status(200).json(obj);
	});
});

app.listen(port, () => console.log(`Listen at port: ${port}!`));

