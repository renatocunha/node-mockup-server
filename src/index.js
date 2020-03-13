const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 4000;
const fs = require('fs');
const path = require('path');
const asyncHandler = require('express-async-handler');
const rootFolder = path.join(__dirname,'artifacts');

const main = () => {	
	app.use(cors());
	app.use(bodyParser.urlencoded({ extended: false}));
	app.use(bodyParser.json())
	
	app.get('/v1/artifact/:uuid', function(req, res){
		const f = rootFolder + '/' + req.params.uuid + '.json';
		let obj = fs.readFileSync(f,'utf8');
		res.status(200).json(JSON.parse(obj));
	});

	app.get('/v1/artifacts/', asyncHandler(async(req, res) => {
		let artifacts = await get_all_files();
		res.status(200).json(artifacts);
	}));

	app.post('/v1/artifact', function(req, res){
		const path = rootFolder + '/' + req.body.uuid + '.json';
		try{
			let body = JSON.stringify(req.body);
			fs.writeFileSync(path,body);
			res.status(201).send({status: "SUCCESS"});
		}catch(err){
			console.error(err);
			res.status(500).send({status: "ERROR"})
		}
	});

	app.listen(port,() => console.log(`Listen at port: ${port}!`));
	
}

main();

async function get_all_files(){
	let artifacts =  [];
	let files = fs.readdirSync(rootFolder);
	let obj;
	for (let index = 0; index < files.length;index++){
		obj = fs.readFileSync(rootFolder + '/'+ files[index],'utf8');
		artifacts.push(JSON.parse(obj));
	}
	return artifacts;
}