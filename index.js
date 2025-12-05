//Ref - https://www.freecodecamp.org/news/create-crud-api-project/

import express from 'express';
import bodyParser from 'body-parser'; // Allows us to get body of incoming post request
import userRoutes from './routes/users.js'; //userRoutes is just a keyword, it will recieve whatever you exported as default from users.js
import mongoose from 'mongoose';
import dotenv from 'dotenv'; 

dotenv.config();

const app = express(); // created an app using express object
const PORT = process.env.port | 5000; // port for the app
app.use(bodyParser.json()); // Specified that json data will be used in application

// Tells express whenever someone hits /users route, use userRoutes to handle those requests 
app.use('/users', userRoutes);

// app.get() function accepts two parameters, first one is path, and second is callback, where we define 
// what happens when get request is called.
// callback function also has two parameters. request(incoming request) and result(the information we want to send)
// app.get('/', (req, res) => {
//     console.log('[GET ROUTE]');
//     res.send("HELLO FROM NODE");
// })

//DataBase Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Conncted to Mongo Db");

        // listen method to make app listen for incoming requests. 
        //It takes two argumetns, 
        // 1. Port - here we would be listening incoming requests from client side
        // 2. Callback function that would be triggered only once when our server starts.
        // app.listen(PORT, () => console.log(`Server running on port: http//localhost:${PORT}`));
        app.listen(PORT, () => console.log(`Server running on port: http//localhost:${PORT}`));
    })
    .catch((err) => {
        console.error('MongoDB Connection Error', err);
    })
