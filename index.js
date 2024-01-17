// Estamos importando un módulo nativo de Node de servidor we
const http = require('http');

// Creamos un array de objetos con los datos de las notas.
let notes = [
    {
        id: 1,
        content: "HTML is easy",
        date: "2019-05-30T17:30:31.098Z",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only Javascript",
        date: "2019-05-30T18:39:34.091Z",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        date: "2019-05-30T19:20:14.298Z",
        important: true
    }
]

// Para crear un servidor, necesitamos crear una función que reciba dos parámetros:
const app = http.createServer((req, res) => {
    // req es la petición que se hace al servidor
    // res es la respuesta que se envía al cliente

    // La respuesta se envía con el método writeHead y el método end en el cuerpo de la respuesta.
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(notes)); 
});

// Definimos el puerto en el que el servidor se ejecutará.
const PORT = 3001;

// Entonces podemos iniciar el servidor con el método listen dentro del puerto anteriormente definido.
app.listen(PORT);
// Por último, mostramos por consola el mensaje de inicio del servidor.
console.log(`
Server running on port ${PORT}
-- To close the server, press Ctrl + C --
`);
