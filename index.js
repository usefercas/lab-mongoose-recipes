// Importamos mongoose para conectarnos a la base de datos
const mongoose = require('mongoose');

// Importamos el modelo Recipe de './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Nos traemos el array de recetas que está en el archivo data.json
const data = require('./data');

// Importante que el nombre de la base de datos está al final de la URI
const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';


// Conectamos a la base de datos "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Antes de hacer nada, borramos todas las recetas que pueda haber ya en la base de datos
    return Recipe.deleteMany();
  })
  .then(() => {
    console.log("creo receta ")
    return Recipe.create(data);
  })
  .then(() => {
    console.log("actualizo receta")
    return Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 });
  })
  .then(() => {
    console.log("elimina solo uno ")
    return Recipe.deleteOne({ title: 'Carrot Cake' });
  })
  .then(() => {
    console.log("conection close")
    return mongoose.connection.close();
  })
  .then(() => {
    console.log('Connection closed');
  })
  .catch(error => {
    console.error(error);
  });
