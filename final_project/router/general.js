const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
let profiles = require("./auth_users.js").profiles;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  let regDetail = req.body;
  console.log(regDetail);
  if(regDetail){
    let username = regDetail.username;
    let password = regDetail.password;
    let usernameVal = isValid(username);
    if(usernameVal){
        profiles.push({"username":username, "password":password});
        console.log(profiles);
        return res.status(200).send("User registration successful");
     }else{
        return res.status(300).json({message: " the username you supplied is not valid as it already exist ."});
    }
  }else{
    return res.status(300).json({message: "please supply username and password for registration"});
  }
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  //book 1: 
  return res.status(300).json({message: books});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  let query = req.params.isbn;
  console.log(query);
  if(query){
    for(let firstKeys in books){
        console.log(books[firstKeys].ISBN);
        if(books[firstKeys].ISBN==query){
            return res.status(200).json({"message":books[firstKeys]})
        }
    }
    return res.status(400).json({message: "sorry we do not have a book with that ISBN number"});

   }else{
      return res.status(400).json({message: " please supply a valid ISBN number "});
   }
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let query = req.params.author;
  console.log(query);
  if(query){
    for(let firstKeys in books){
        console.log(books[firstKeys].author);
        if(books[firstKeys].author==query){
            return res.status(200).json({"message":books[firstKeys]})
        }
    }
    return res.status(400).json({message: "sorry we do not have a book with that Author name"});

   }else{
      return res.status(400).json({message: " please supply a valid author name "});
   }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  let query = req.params.title;
  console.log(query);
  if(query){
    for(let firstKeys in books){
        console.log(books[firstKeys].title);
        if(books[firstKeys].title==query){
            return res.status(200).json({"message":books[firstKeys]})
        }
    }
    return res.status(400).json({message: "sorry we do not have a book with that title"});

   }else{
      return res.status(400).json({message: " please supply a valid title "});
   }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  let query = req.params.isbn;
  console.log("Query: ", query);
  if(query){
    for(let firstKeys in books){
        console.log(books[firstKeys].ISBN);
        if(books[firstKeys].ISBN==query){
            return res.status(200).json({"message":books[firstKeys].reviews})
        }
    }
    return res.status(400).json({message: "sorry we do not have a book with that ISBN Number"});

   }else{
      return res.status(400).json({message: " please supply a valid ISBN Number"});
   }
});

module.exports.general = public_users;
