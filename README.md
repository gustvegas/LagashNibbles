# Lagash Nibbles

![Game Image Small](https://raw.githubusercontent.com/DiegoGLagash/LagashNibbles/master/wnibbles/images/sample30x30.png)

El juego consiste en controlar una serpiente en un espacio fijo de dos dimensiones evitando que ésta colisione con los bordes o con los otros jugadores. En cada turno la serpiente se desplaza una posición, y cada cinco turnos la serpiente incrementa su tamaño.

El juego termina cuando un jugador colisiona siendo dicho jugador el perdedor y el resto de los jugadores se considera ganadores. Existe un caso especial en el cual dos serpientes colisionan en su cabeza, en dicho caso ambos se consideran perdedores.

El desafío del juego es crear un programa que controle la serpiente y que sea la última en perder. Esto se puede logar evitando colisionar con los bordes y otras serpientes, pero también evitando encerrarse en regiones de las que no puede salir, o bien generando espacios para encerrar oponentes de forma que no puedan escapar.

## Quiero jugar
Para participar del juego es necesario crear un programa que atienda en un *Endpoint* una llamada REST devolviendo al control central la nueva dirección, en caso que desee cambiarla. 

En cada turno todos los jugadores son consutados al mismo tiempo y se les envía el mismo estado de juego, una vez que todos han respondido, se aplican los cambios en el juego y se vuelve a solicitar una nueva decisión. Para evitar que el orden de juego impacte en el desempeño cada turno se cambia el orden en el que se aplican los cambios.

Se incluyen a modo de ejemplo dos programas que implementan un comportamiento simple que evitan colisiones mediante la selección de la dirección siguiendo las agujas del reloj:
- `NibbleAppJS`. Una implementación en JavaScript plano, usando Express en NodeJS.
- `NibbleAppTS`. Una implementación en TypeScript usando Express en NodeJS.

Se pueden ver en juego estas dos implementaciones utilizando el código de ejemplo y tener un competidor de referencia para probar el desarrollo del nuevo controlador.

## Método REST
La definicion en Swagger del API que debe implementarse es parte del código, con lo cual las serpientes pueden programarse en cualquier lenguaje. La información que se le envía en cada pedido de decisión es:
 - `snake`: Serpiente que debe ser controlada.
 - `space`: El mapa del estado del juego.
 - `snakes`: Todas las serpientes que participan del juego (incluso la que debe ser controlada).

### `snake`
Una serpiente tiene un identificador numérico único (`id`), un vector que representa la posición de su cabeza (`x`, `y`) y la dirección (`direction`) en la que se está desplazando. A su vez se informa el largo total de la serpiente (`length`), la cantidad de turnos que ha sobrevivido (`ticks`) y un listado con todos los cambios de dirección que ha hecho la serpiente (`trail`). La información que se encuentra en trail está presente en `space`, indicando qué serpiente se encuentra en cada casilla. **Importante:** Tener en cuenta que en el array `trail` el movimiento más reciente está en el último elemento y el siguiente en el anterior, etc, nada que `Array.prototype.reverse()` no pueda resolver. 
### `space`
Es la información del espacio de juego, el tamaño del espacio (`topX`, `topY`) y un mapa (`map`) con el espacio de juego en dos dimensiones donde cada elemento de la matrix es un valor 0 (cero) si se encuentra vacío, o el id de la serpiente que se encuentra en dicho casilleto.
### `snakes`
 Un listado con todas las serpientes que participan del juego con la misma información que posee snake.

### Respuesta
El método deve devolver la nueva dirección que puede ser uno de los siguientes `"Up"`, `"Right"`, `"Down"` o `"Left"`. La serpiente no puede cambiar su dirección en 180 grados, por ejemplo si su dirección fuera `"Right"`, no puede cambiar a `"Left"`, en un mismo turno, sino que debe cambiar a `"Up"` o `"Down"` y en el próximo turno cambiar a `"Left"`. En caso que el programa cambie la dirección en 180 grados, se mantendrá la misma dirección.

 ## ¿Cómo lo pruebo?
 El código fuente que se agrega contiene el FrontEnd que es el programa que coordina el juego, consulta a cada serpiente y aplica las decisiones manteniendo el estado del juego. Además imprime el estado del juego visualmente y decide quien es el perdedor de cada partida.

 Dentro del proyecto `frontend` se encuentra un archivo `public/endpoints.json` donde se puede registrar el *endpoint* y ya se puede comenzar a jugar. El nombre de la serpiente puede ser Emoji y este se dibujará.

 Para facilitar la ejecución y evitar la instalación de dependencias, está distribuido como containers de [Docker](http://www.docker.com/), y para levantar todo el ejemplo, se utiliza *docker-compose*.  Es importante tener instalado Docker en la máquina de desarrollo para acelerar el despliegue. También es necesario tener [NodeJS](http://nodejs.org/) y [Grunt](https://gruntjs.com) instalado en la máquina para poder ejecutar los comandos de compilación y deployment. Instalar **Docker** y **NodeJS** después, pueden instalar Grunt ejecutando en la consola, en cualquier directorio:

 `npm install -g grunt-cli`

Para instalar todas las dependencias de cada uno de los proyectos, se debe usar la tarea definida en el proyecto raíz:

`grunt install`

En la consola puede ejecutarse el siguiente comando, el directorio que contiene el archivo `docker-compose.yml` para compilar la solución:

 `grunt`

Una vez compilada la solución, se pueden crear los contenedores mediante la ejecución del siguiente comando en la misma carpeta:

`grunt build`

El comando build demora unos segundos dado que prepara las imágenes de Docker necesarias para correr el juego y los ejemplos disponibles. Esto es necesario solo una vez o cada que vez que se modifique el `package.json` del ejemplo. 

Para poner a funcionar los contenedores se cuenta con el comando:

`grunt run`

Una vez iniciados los contenedores se puede apuntar el navegador a la dirección `http://localhost:9090/` [Lagash Nibbles](http://localhost:9090/).

Para limpiar el entorno (imágenes de docker creadas, contenedores, etc) se cuenta con el comando: 

`grunt stop`

Si están programando y cambiando el código pueden ejecutar más rápidamente el entorno compilando y reiniciando los contenedores con el comando:

`grunt rundev`

*Nota*: El entorno asume que los puertos 9090, 9091 y 9092 se encuentran libres, si esto no fuera así, se puede hacer el cambio en el archivo `docker-compose.yml` en la sección `ports`.

**Importante** van a tener que pasar un `Dockerfile` junto con su código, porque cada participante va a ejectuar como un microservicio, asegúrense que esté funcionando dentro de Docker. Cada container tiene un límite de memoria para que nadie se haga el vivo, si necesitan más memoria avisen. El ambiente de desarrollo está seteado tal como se va a ejecutar.

 ## El código fuente del DummyBehavior en TypeScript

Es importante que el método permita la ejecución desde otros hosts (CORS), dado que será invocado desde el browser, en los ejemplos pueden ver los Headers necesarios para evitar esta validación en el browser.

Se inicia instanciando una clase de soporte llamada `Snake` que mantiene los datos del JSON enviado en el request.
```typescript
    let snake = new Snake(+req.body.snake.id);
    snake.x = +req.body.snake.x;
    snake.y = +req.body.snake.y;
    let direction: Direction = (<any>Direction)[req.body.snake.direction];
    snake.direction = direction;
    snake.ticks = +req.body.snake.ticks;
    snake.trail = req.body.snake.trail;
```

Se leen los datos del espacio de juego y se guardan en la clase `Space`:
```typescript
    let space = new Space(req.body.space.topX, req.body.space.topY);
    space.map = req.body.space.map;
```

Se guarda la dirección actual en la variable `newDirection` y se llama al método de soporte `noveNew()`, que devuelve un `Vector` posicionado en el lugar donde se movería la serpiente siguiendo en la misma dirección. Esa posición se guarda en la variable `pos`.

```typescript
    let newDirection = snake.direction;
    // Si no me choco adelante, sigo igual
    let pos = snake.moveNew();
```

Se utiliza el método de soporte `isValidInBounds()` para determinar si la nueva posición está dentro de los límites del espacio de juego. Y luego se procede a verificar que en dicha posición no haya otro jugador, mediante el uso de la información de `space.map[x][y]`, si el valor está en 0, quiere decir que el espacio está libre. Si así fuera, decide mantener la misma dirección.
```typescript
    if(pos.isValidInBounds(space)
        && (space.map[pos.x][pos.y] === space.EMPTY)) {
        newDirection = snake.direction;                
    }else{
```

Si no pudiera moverse a la posición mencionada se procederá a elegir una nueva dirección, para ello se procederá a iterar por las distintas direcciones posibles. En cada dirección, si no se trata de la dirección opuesta a la original, se utiliza el método de soporte `moveNewDirection(direction)` que devuelve la posición a la que se movería la serpiente, pero utilizando la dirección provista en el parámetro, esta nueva posición se guarda en la variable `pos`, y se realizan distintas verificaciones:
- Que esté dentro de los márgenes del juego.
- Que no haya otro jugador en dicha posición.
Cuando encuentra una dirección que satisface las validaciones, almacena dicha dirección en la variable `newDirection` e interrumpe la iteración con la nueva dirección.
```typescript
      //Busco nueva dirección clockwise para no chocarme
      for(let i:number = 1; i <= 4; i++) {
          let dir = Direction[Direction[i]];
          if(snake.isOpositeDirection(dir)) {
              continue;
          }
          pos = snake.moveNewDirection(dir);
          if(!pos.isValidInBounds(space)) {
              continue;
          }
          if(space.map[pos.x][pos.y] != space.EMPTY) {
              continue;
          }
          newDirection = dir;
          break;
      }
    }
```

Para finalizar se crea un objeto con la dirección seleccionada, para ser enviado al cliente.
```typescript
    let dstring: string = Direction[newDirection];
    let payload: Object = {
      direction: dstring,
    };
    
    //render json
    this.json(req, res, payload);
```

Mucha suerte a todos los participantes. Happy coding y que la fuerza esté con cada uno.