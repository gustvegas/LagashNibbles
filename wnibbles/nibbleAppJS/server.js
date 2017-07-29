const express        = require('express');
const bodyParser     = require('body-parser');
const app            = express();

app.use(bodyParser.json());
//allow CORS calls
app.use(function(req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
		res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

		// intercept OPTIONS method
		if ('OPTIONS' == req.method) {
			res.send(200);
		}
		else {
			next();
		}
});

app.post('/nextMove', (req, res) => {
  console.log("nextMove");
	res.json({ direction: 'Up' });
});

const port = 8000;
app.listen(port, () => {
  console.log('We are live on ' + port);
});

