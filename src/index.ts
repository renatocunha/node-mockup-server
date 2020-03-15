import app from './app';

const port = 9000;

/**
 * Starts the mockup server listening at port 9000
 * TO-DO - make port variable
 */
app.listen(port, (err: string) => {
	if (err){
		return console.error(err);
	}

	return console.log(`// listening on port: ${port}       //`);
});

