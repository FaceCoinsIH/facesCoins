// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const bcryptSalt = 10;

mongoose
    .connect('mongodb://localhost/starter-code', { useNewUrlParser: true })
    .then(x => {
        console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    })
    .catch(err => {
        console.error('Error connecting to mongo', err)
    });


let generateUser = {
    username: 'stevenzzzzz',
    password: bcrypt.hashSync('steven', bcrypt.genSaltSync(bcryptSalt)),
    email: 'steven@gmail.com',
    name: 'steven',
    lastName: 'Ruiz'
}

let generatePost = {
    title: 'proyecto',
    content: 'contenido'
}

let generateComments = {
    title: 'titulo',
    content: 'contenido titulo',
    comments: 'comentario'
}

let generateNews = {
    title: 'Proyecto',
    description: 'descripcion de proyecto',
    content: 'contenido',
    date: 'fecha',
    image: 'imagen'
}



User.deleteMany()
    .then(() => {
        return User.create(users)
    })
    .then(usersCreated => {
        console.log(`${usersCreated.length} users created with the following id:`);
        console.log(usersCreated.map(u => u._id));
    })
    .then(() => {
        // Close properly the connection to Mongoose
        mongoose.disconnect()
    })
    .catch(err => {
        mongoose.disconnect()
        throw err
    })