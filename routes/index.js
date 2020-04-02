const express = require('express');
const router = express.Router();
const passport = require('passport');
const { ensureAuthenticated } = require('../config/auth');
const { con } = require('../config/connection');
const mongoose = require('mongoose');
const AuthorisedUser = require('../models/authorisedUsers');

router.get('/', (req, res) => {
        if(req.user){
            res.redirect('/dashboard?#');
        }else{
            res.render('index');
        }
})

router.get('/dashboard', ensureAuthenticated, (req, res) => {
    con.getConnection((err, connection) => {
        if (err) throw err;
        console.log("Connected!");
        let sql = "select * from products;";
        connection.query(sql, (err, result) => {
            connection.release(); 
            if (err) throw err;
            console.log(result[0]);
            console.log(result[1]);
            console.log(result[2]);
            console.log(result[3]);
            res.render('dashboard', { products: result, user: req.user });
        });
    });
})

module.exports = router;