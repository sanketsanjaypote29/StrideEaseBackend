const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const users2Schema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
});

users2Schema.pre('save', async function (next) {
    if (this.isModified('password') && this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    
    next();
  });


  users2Schema.methods.generateToken = async function() {
    try{
        return jwt.sign({
            email: this.email,
        },

            process.env.JWT_KEY,
            {
                expiresIn: "1d",
            }
        
        );
    } catch (error) {
        console.log(error);
    }
  };

module.exports = mongoose.model('users2',users2Schema);