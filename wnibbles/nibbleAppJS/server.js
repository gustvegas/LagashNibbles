const express        = require('express');
const bodyParser     = require('body-parser');
const app            = express();

app.use(bodyParser.json());
app.post('/nextMove', (req, res) => {
	// You'll create your note here.

	res.json({ direction: 'Up' });
});

const port = 8000;
app.listen(port, () => {
  console.log('We are live on ' + port);
});

