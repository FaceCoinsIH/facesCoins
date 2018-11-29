// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require('dotenv').config();
const User = require("../models/User");
const Post = require("../models/Post");
const News = require("../models/News");
const Comments = require("../models/Comments");


const bcryptSalt = 10;

mongoose
    .connect(process.env.DB, { useNewUrlParser: true })
    .then(x => {
        console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    })
    .catch(err => {
        console.error('Error connecting to mongo', err)
    });


let generateUser = [{
    username: 'Paco',
    password: bcrypt.hashSync('steven', bcrypt.genSaltSync(bcryptSalt)),
    email: 'steven@gmail.com',
    name: 'steven',
    lastName: 'Ruiz'
}, {
    username: 'Juan',
    password: bcrypt.hashSync('steven', bcrypt.genSaltSync(bcryptSalt)),
    email: 'steven@gmail11111.com',
    name: 'steven',
    lastName: 'Ruiz'
}]

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
        return User.create(generateUser)
    })
    .then(usersCreated => {
        console.log(usersCreated)
        generateComments.author = usersCreated[0]._id;

        return Comments.create(generateComments)
    })
    .then(comment => {
        generatePost.comments = [comment._id];
        return Post.create(generatePost);
    })
    .then(() => {
        return News.create(generateNews);
    })

.then(() => {
        // Close properly the connection to Mongoose
        mongoose.disconnect()
    })
    .catch(err => {
        mongoose.disconnect()
        throw err
    })