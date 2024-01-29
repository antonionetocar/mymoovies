const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mooviesRoutes = require('./src/routes/moovies');
const categoryRoutes = require('./src/routes/category');

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.get('/moovies',function(req,res) {
    res.send("entrei moovies");
});
app.use('/category', categoryRoutes);
app.use('/moovies', mooviesRoutes);

app.listen(3000,()=>{
    console.log('server running on http://localhost:3000');

});