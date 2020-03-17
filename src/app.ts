import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as asyncHandler from 'express-async-handler';
import * as bodyParser from 'body-parser';

const rootFolder: string = path.join(__dirname, 'artifacts');
const encode: string  = 'utf8'
const statusOk: number = 200;
const statusCreated: number = 201;
const statusError: number = 500;
const statusNotFound: number = 404;
const errBody: object = { status: "error", errCode: statusError };
const scsBody: object = { status: "success"};

class App {
	public express;
	constructor(){
		this.express = express();
		this.express.use(bodyParser.urlencoded({extended: false}));
		this.express.use(bodyParser.json());
		this.routes();
		this.console_start_up(9000);
	}

	private routes(){
		const router = express.Router();
		router.get('/v1/artifact/:uuid', function(req,res) {
			
			console.log('Geting: ', req.params.uuid);
			
			const file: string = `${rootFolder}/${req.params.uuid}.json`;
			const json: string = fs.readFileSync(file, encode);
			
			if (json === ''){
				res.status(statusNotFound).json(statusError);
			}else{
				res.status(statusOk).json(JSON.parse(json));
			}
			
		});

		router.get('/v1/artifacts/', asyncHandler(async(req, res) => {
			console.log('getting all files');
			let artifacts: Array<object> = await this.get_all_files();
			res.status(statusOk).json(artifacts);
		}));

		router.post('/v1/artifact/', function(req, res){
			let timeStamp = `[${ Date() }]`
			console.log('POST: ', timeStamp);
			try{
				console.log('uudi: ', req.body.uudi);
				if (req.body.uuid === ''){
					console.log('invalid uuid');
					res.status(statusError).json(errBody);
				}else{

					const jsonBody: string = JSON.stringify(req.body);
					const jsonPath: string = `${rootFolder}/${req.body.uuid}.json`;
					console.log('writing file: ',jsonPath )
					fs.writeFileSync(jsonPath, jsonBody);
					console.log('file created successfuly');
					res.status(statusCreated).send(scsBody);
				}
			}catch(err){
				res.status(statusError).json(errBody);
			}
		});
		
		this.express.use('/',router);
	}

	private async get_all_files(){
		let artifacts: Array<object> = [];
		let files = fs.readdirSync(rootFolder);
		for (let index = 0;index < files.length ; index++){
			let obj = fs.readFileSync(rootFolder + '/'+ files[index],encode);
			artifacts.push(JSON.parse(obj));
		}
		return artifacts;
	}

	public console_start_up(port: number){
		console.log('// Starting Node Mockup Restful Server // ')
		console.log('// App version 0.0.02                 //  ')
	}
	
}

export default new App().express;
