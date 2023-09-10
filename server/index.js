const exp = require('constants');
const express=require('express');
const uploadRoute=require('./routes/uploadRoutes');
const dataRoute=require('./routes/dataRoute');

const app=express();



app.use(express.json());

app.use(express.static('public'));

app.use('/upload',uploadRoute);

app.use('/data',dataRoute);


const port=process.env.PORT || 4000;

app.listen(port,console.log('app is running on port ',port))