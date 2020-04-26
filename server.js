//import npm packages
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');


const app = express();
const PORT = process.env.PORT || 8080;
//mongodb+srv://playerone:<password>@cluster0-wcqxz.mongodb.net/test?retryWrites=true&w=majority
//mongodb+srv://playerone:<password>@cluster0-wcqxz.mongodb.net/test?retryWrites=true&w=majority
//const MONGODB_URI = 'mongodb+srv://playerone:Letmein@cluster0-wcqxz.mongodb.net/test?retryWrites=true&w=majority';

const routes = require('./routes/api');


//MONGODB_URI ||
mongoose.connect( process.env.MONGODB_URI || 'mongodb://localhost/this_one', {
     useNewUrlParser: true,
     useUnifiedTopology: true

 });

 mongoose.connection.on('connected',() => {
     console.log('Mongoose is connected');
 });

//data parsing
app.use(express.json());
app.use(express.urlencoded({extended: false})) ;

app.use(morgan('tiny'));

app.use('/api', routes);

//step 3 - check if app on Heroku
// How to serve the application - when in production and dev
if(process.env.NODE_ENV === 'production') {
    //app.use(express.static('/client/build'));
    app.use(express.static(path.join(__dirname, 'client/build')));
    
    //when serving every request after home route - for react-router
    app.get("/*", function(req, res) {
        res.sendFile(path.join(__dirname, "client/build/index.html"));
    });
}




app.listen(PORT, console.log(`Server is starting at ${PORT}`));



