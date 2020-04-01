import app from './app';
import * as yargs from 'yargs';

/**
 * Starts the mockup server listening at port 9000
 * TO-DO - make port variable
 */

const param = yargs.default('p',9000);

param.argv.p

const port = param.argv.p;

app.listen(port, (err: string) => {
	if (err){
		return console.error(err);
	}
	
	return console.log(`// listening on port: ${port}             //`);
	
});

