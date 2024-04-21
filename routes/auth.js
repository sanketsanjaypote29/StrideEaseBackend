const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Users2 = require('../models/users2Schema');
const getdbConn = require('../db/conn');

router.post("/register", async (req, res) => {
    try {
      const dbConn = getdbConn();
      let user = await dbConn.collection('users').findOne({ email: req.body.email });
      let user2 = await dbConn.collection('users2').findOne({ email: req.body.email });
      let user_name = await dbConn.collection('users2').findOne({ username: req.body.username });
      if (user || user2) {
        return res.status(400).json({ msg: "Email already exists" });
      }
      if(user_name) {
        return res.status(400).json({ msg: "Username already exists" });
      }

      user = new Users2({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });
  
      await user.save();
      res.status(201).json({
        token: await user.generateToken(),
      })
      
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });


  router.post("/login", async (req, res) => {
    try {
      const dbConn = await getdbConn();
      let user = await dbConn.collection('users2').findOne({email: req.body.email});
      
      if (!user) {
        return res.status(400).json({ msg: "Email not found" });
      }
  
      if(user){
        const isMatch = await bcrypt.compare(req.body.password, user.password); 
        console.log('Password Comparison Result:', isMatch);
        if (!isMatch) {
          return res.status(400).json({ msg: "Wrong password" });
        }
      }
  
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });
  
  module.exports = router;