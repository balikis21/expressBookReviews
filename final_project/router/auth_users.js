const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];
let profiles = [
    {"username":"saheed", "password":"123456"},
];
const secret = "mYsectreTword"
const isValid = (username)=>{ //returns boolean
    //write code to check if the username is valid
    for(let keys in profiles){
        console.log("user val", profiles[keys].username);
        if(profiles[keys].username==username){
            return false;
        }
    }
    return true;
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
    for(let keys in profiles){
        console.log("user val", profiles[keys].username);
        if(profiles[keys].username==username && profiles[keys].password == password){
            return true;
        }
    }
    return false;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  let usedts = req.body;
  if(usedts){
    let username = usedts.username;
    let password = usedts.password;
    let authStatus = authenticatedUser(username, password);
    if(authStatus){
        let token = jwt.sign({"username":username}, secret, { expiresIn: '1h' })
        // Store token in session
        req.session.token = token;
        return res.status(200).send({"token": token});
    }else{
        return res.status(300).json({message: "Wrong username on password"});
    }
  }else{
    return res.status(300).json({message: "Please provide a valid username on password"});
  }
  
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  let review = req.body.review;
  let username = req.user.username;
  let query = req.params.isbn;
  if(review){
    for(let firstKeys in books){
        if(books[firstKeys].ISBN == query){
            let allReviews = books[firstKeys].reviews;
            allReviews[username] = review;
            console.log(allReviews);
            return res.status(300).send({message: allReviews});
        }
    }
    return res.status(300).json({message: "We could not find a book with that ISBN number "});
  }else{
    return res.status(300).json({message: "Please add a review"});
  }
  
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
module.exports.profiles = profiles;
module.exports.secret = secret;
