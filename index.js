// Importamos express, que esta vez será una función
const express = require('express')
// Creamos nuestra aplicación de express, que será una función
const app = express()

// Definimos un array de notas, que será un array de objetos para ser convertidos a JSON
let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only Javascript',
    date: '2019-05-30T18:39:34.091Z',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true
  },
  {
    id: 4,
    content: 'NODE JS is required for this application',
    date: '2024-01-17T19:20:14.298Z',
    important: true
  },
  {
    id: 5,
    content: 'This is a test note and it will be deleted.',
    date: '2024-01-17T19:20:14.298Z',
    important: false
  }
]

// Hacemos uso de la función express.json() para poder recibir datos en formato JSON desde el cliente.
app.use(express.json())

// Utility functions
// Función para generar un id único. El método Math.max devuelve el máximo de los argumentos. El método map itera sobre cada elemento del array y devuelve un nuevo array con los resultados de la función
const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(note => note.id))
    : 0
  return maxId + 1
}

// Definimos una ruta para el servidor, que será la raíz de la app. Esta devuelve un HTML con el mensaje de HELLO WORLD.
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

// Definimos una ruta para el servidor, que será /api/notes. Su respuesta es mi array notes convertido en JSON.
app.get('/api/notes', (request, response) => {
  response.json(notes)
})

// Definimos la ruta para buscar un recurso en particular en el servidor, que será /api/notes/:id. Esta devuelve la nota con el id especificado en formato JSON.
app.get('/api/notes/:id', (request, response) => {
  // Establecemos un número identificador
  const id = Number(request.params.id)
  // Creamos un filtro para buscar la nota con el id especificado. El método find devuelve el primer elemento del array que cumpla la condición.
  const note = notes.find(note => note.id === id)
  // Si la nota no existe, devolvemos un 404.
  if (note === undefined) {
    response.status(404).end()
  } else {
    // Devolvemos la nota encontrada en formato JSON.
    response.json(note)
  }
})

// Se implementa una ruta para crear un recurso en el servidor, que será /api/notes.
app.post('/api/notes', (request, response) => {
  const bodyRequest = request.body
  if (!bodyRequest.content) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const note = {
    id: generateId(),
    content: bodyRequest.content,
    date: new Date().toISOString(),
    important: typeof bodyRequest.important !== 'undefined' ? bodyRequest.important : false
  }

  notes = [...notes, note]

  response.json(note)
})

// Se implementa una ruta para eliminar un recurso en particular en el servidor, que será /api/notes/:id.
app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)
  response.status(204).end()
})

// Definimos el puerto de mi servidor.
const PORT = 3001
// Iniciamos el servidor en el puerto definido e imprimimos un mensaje en la consola.
app.listen(PORT, () => {
  console.log(`
Server running on port ${PORT}
** PRESS CTRL + C TO STOP SERVER **
`)
})
