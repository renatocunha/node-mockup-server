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
	const file = req.body;
	console.log("file:");
	console.log(file);
	try{
		artifacts.push(file);
		res.status(201).send({status: "SUCCESS"});
	}catch(err){
		console.error(err);
		res.status(500).send({status: "ERROR"})
	}
});


app.get('/v1/artifacts', function(req, res){
	console.log('All Artifacts');
	res.json(artifacts);
});

app.get('/v1/artifact:uuid', function(req, res){
	console.log('searching for artifact');
	const uuid = req.params.uuid;
	for (let artifact of artifacts){
		if (artifact.uuid === uuid ){
			console.log('found');
			res.status(200).json(artifact);
		}
	}
	res.status(404).send('Artifact not found');
});

app.get('/v1/artifact/:uuid', function(req, res){
	console.log('Local files');
	let uuid = './artifacts/'+ req.params.uuid + '.json';
	console.log(uuid);
	fileSystem.readFile(uuid,function(err, json){
		let obj = JSON.parse(json);
		res.status(200).json(obj);
	});
});

app.listen(port, () => console.log(`Listen at port: ${port}!`));
