const { UserModel } = require("../Model/usersModel");
const jwt = require("jsonwebtoken");
const express = require("express");
const userRoute = express.Router();
userRoute.use(express.json());
const bcrypt = require("bcrypt");
userRoute.post("/login", async (req, res) => {
  const { email, password} = req.body;
  
  try {
    const user = await UserModel.findOne({ email });
    
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          res.status(200).send({
            msg: "Login Successfull",
            token: jwt.sign({"userId":user._id}, "shhhhh"),
            name:user.name
          });
        } else {
          res.status(200).send({ "msg": "Wrong Credential" });
        }
      });
    }
    else{
        res.status(200).send({ "msg": "Wrong Credential" }); 
    }
  } catch (err) {
    res.status(400).send(err);
  }
});
userRoute.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      bcrypt.hash(password, 3, async (err, hash) => {
        const user = new UserModel({ name, email, password: hash });
        await user.save();
        res.status(200).send({ msg: "Registration has been done!" });
      });
    } else {
      res.status(400).send( {msg:"This Email is Alreay Registered"});
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

module.exports = {
  userRoute,
};
