# Lagash Nibbles

El juego consiste en controlar una serpiente en un espacio fijo de dos dimensiones evitando que ésta colisione con los bordes o con los otros jugadores. En cada turno la serpiente se desplaza una posición, y cada cinco turnos la serpiente incrementa su tamaño.

El juego termina cuando un jugador colisiona siendo dicho jugador el perdedor y el resto de los jugadores se considera ganadores. Existe un caso especial en el cual dos serpientes colisionan en su cabeza, en dicho caso ambos se consideran perdedores.

El desafío del juego es crear un programa que controle la serpiente y que sea la última en perder. Esto se puede logar evitando colisionar con los bordes y otras serpientes, pero también evitando encerrarse en regiones de las que no puede salir, o bien generando espacios para encerrar oponentes de forma que no puedan escapar.

## Quiero jugar
Para participar del juego es necesario crear un programa que atienda en un *Endpoint* una llamada REST devolviendo al control central la nueva dirección, en caso que desee cambiarla. 

En cada turno todos los jugadores son consutados al mismo tiempo y se les envía el mismo estado de juego, una vez que todos han respondido, se aplican los cambios en el juego y se vuelve a solicitar una nueva decisión. Para evitar que el orden de juego impacte en el desempeño cada turno se cambia el orden en el que se aplican los cambios.

## Método REST
La definicion en Swagger del API que debe implementarse es parte del código, con lo cual las serpientes pueden programarse en cualquier lenguaje. La información que se le envía en cada pedido de decisión es:
 - `snake`: Serpiente que debe ser controlada.
 - `space`: El mapa del estado del juego.
 - `snakes`: Todas las serpientes que participan del juego (incluso la que debe ser controlada).

### `snake`
Una serpiente tiene un identificador numérico único (`id`), un vector que representa la posición de su cabeza (`x`, `y`) y la dirección (`direction`) en la que se está desplazando. A su vez se informa el largo total de la serpiente (`length`), la cantidad de turnos que ha sobrevivido (`ticks`) y un listado con todos los cambios de dirección que ha hecho la serpiente (`trail`). La información que se encuentra en trail está presente en `space`, indicando qué serpiente se encuentra en cada casilla.
### `space`
Es la información del espacio de juego, el tamaño del espacio (`topX`, `topY`) y un mapa (`map`) con el espacio de juego en dos dimensiones donde cada elemento de la matrix es un valor 0 (cero) si se encuentra vacío, o el id de la serpiente que se encuentra en dicho casilleto.
### `snakes`
 Un listado con todas las serpientes que participan del juego con la misma información que posee snake.

### Respuesta
El método deve devolver la nueva dirección que puede ser uno de los siguientes `"Up"`, `"Right"`, `"Down"` o `"Left"`. La serpiente no puede cambiar su dirección en 180 grados, por ejemplo si su dirección fuera `"Right"`, no puede cambiar a `"Left"`, en un mismo turno, sino que debe cambiar a `"Up"` o `"Down"` y en el próximo turno cambiar a `"Left"`. En caso que el programa cambie la dirección en 180 grados, se mantendrá la misma dirección.

 ## ¿Cómo lo pruebo?
 El código fuente que se agrega contiene el FrontEnd que es el programa que coordina el juego, consulta a cada serpiente y aplica las decisiones manteniendo el estado del juego. Además imprime el estado del juego visualmente y decide quien es el perdedor de cada partida.

 Dentro del proyecto "frontend" se encuentra un archivo `public/endpoints.json` donde se puede registrar el *endpoint* y ya se puede comenzar a jugar. 

 Para facilitar la ejecución y evitar la instalación de dependencias, está distribuido como containers de Docker, y para levantar todo el ejemplo, se utiliza *docker-compose*.  Es importante tener instalado Docker en la máquina de desarrollo para acelerar el despliegue. También es necesario tener NodeJS y Grunt instalado en la máquina para poder ejecutar los comandos de compilación y deployment. Una vez instalado NodeJS, para instalar Grunt ejecutar en la consola, en cualquier directorio:

 `npm install -g grunt-cli`

 En la consola puede ejecutarse el siguiente comando, el directorio que contiene el archivo `docker-compose.yml` para compilar la solución:

 `grunt`

Una vez compilada la solución, se pueden crear los contenedores mediante la ejecución del siguiente comando en la misma carpeta:

`grunt build`

A continuación para poner a funcionar los contenedores se cuenta con el comando:

`grunt run`

Una vez iniciados los contenedores se puede apuntar el navegador a la dirección `http://localhost:9090/` [Lagash Nibbles](http://localhost:9090/" target="_blank).

Para limpiar el entorno (imágenes de docker creadas, contenedores, etc) se cuenta con el comando: 

`grunt down`

Nota: El entorno asume que los puertos 9090, 9091 y 9092 se encuentran libres, si esto no fuera así, se puede hacer el cambio en el archivo `docker-compose.yml` en la sección `ports`.

 ## El código fuente

 ## 