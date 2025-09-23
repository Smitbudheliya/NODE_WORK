const express = require('express');
const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/AdminData')
mongoose.connect('mongodb+srv://shubham:shubham123@cluster0.k198kt0.mongodb.net/AdminData')



const db = mongoose.connection;

db.once('open',(err) => {
    if(err){
        console.log(err);
    }
    console.log('Connected to Database');
    
})
module.exports = db