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

var dirArray = ["Up", "Right", "Left", "Down"];

app.post('/nextMove', (req, res) => {
	console.log(req.method + " " + req.path);

	let pos = {
		x: req.body.snake.x,
		y: req.body.snake.y
	};
	if(req.body.snake.direction == "Up") {
			pos.y = req.body.snake.y - 1;
	} else if(req.body.snake.direction == "Right") {
			pos.x = req.body.snake.x + 1;
	} else if(req.body.snake.direction == "Down") {
			pos.y = req.body.snake.y + 1;
	} else if(req.body.snake.direction == "Left") {
			pos.x = req.body.snake.x - 1;
	}
	if(((pos.x >= 0) && 
		(pos.y >= 0) &&
		(pos.x < req.body.space.topX) && 
		(pos.y < req.body.space.topY) &&
		(req.body.space.map[pos.x][pos.y] == 0))) {

		// Alguien alrededor?
		let aroundEmpty = true;

		// Valida que no haya nada cerca
		// for(let i=-1; (i < 2) && aroundEmpty; i++) {
		// 	for(let j=-1; (j < 2) && aroundEmpty; j++) {
		// 		if((pos.x+i >= 0) && 
		// 			(pos.y+j >= 0) &&
		// 			(pos.x+i < req.body.space.topX) && 
		// 			(pos.y+j < req.body.space.topY)) {
		// 			if((req.body.space.map[pos.x+i][pos.y+j] != 0 && 
		// 				  req.body.space.map[pos.x+i][pos.y+j] != req.body.snake.id)) {
		// 				aroundEmpty = false;
		// 			}
		// 		}
		// 	}		
		// }

		// Valida que no haya otra cebeza cerca
		for(var i = 0; i < req.body.snakes.length; i++) {
				var other = req.body.snakes[i];
				if(other.id == req.body.snake.id) {
						continue;
				}
				if( other.x > pos.x - 2 && 
						other.x < pos.x + 2 && 
						other.y > pos.y - 2 && 
						other.y < pos.y + 2 ) {
						aroundEmpty = false;
						break;
				}
		}

		if(aroundEmpty) {
			res.json({ direction: req.body.snake.direction });
			return;
		}			
	}



	//Busco nueva dirección clockwise para no chocarme
	for(let i = 0; i < 4; i++) {
			let newDir = dirArray[i];

			//No puede ser la dirección opuesta
			if(req.body.snake.direction == "Up" && newDir == "Down") {
				continue;
			} else if(req.body.snake.direction == "Right" && newDir == "Left") {
				continue;
			} else if(req.body.snake.direction == "Down" && newDir == "Up") {
				continue;
			} else if(req.body.snake.direction == "Left" && newDir == "Right") {
				continue;
			}

			let pos = {
				x: req.body.snake.x,
				y: req.body.snake.y
			};
			if(newDir == "Up") {
				pos.y = req.body.snake.y - 1;
			} else if(newDir == "Right") {
				pos.x = req.body.snake.x + 1;
			} else if(newDir == "Down") {
				pos.y = req.body.snake.y + 1;
			} else if(newDir == "Left") {
				pos.x = req.body.snake.x - 1;
			}
			if((pos.x >= 0) && 
				(pos.y >= 0) &&
				(pos.x < req.body.space.topX) && 
				(pos.y < req.body.space.topY) &&
				(req.body.space.map[pos.x][pos.y] == 0)) {
					res.json({ direction: newDir });
					return;
			}
	}
	res.json({ direction: req.body.snake.direction });
});

const port = 8000;
app.listen(port, () => {
  console.log('We are live on ' + port);
});
