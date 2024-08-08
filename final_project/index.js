const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const customer_routes = require('./router/auth_users.js').authenticated;
const secret = require('./router/auth_users.js').secret;
const genl_routes = require('./router/general.js').general;

const app = express();
app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){
//Write the authenication mechanism here
    //login yet?
    const token = req.session.token
    console.log("session Token: ", token)
    let tkn = req.session.token || req.header('Authorization').slice(7, tkn.length).trimLeft(); //assuming and what direction token start sweets "Bearer"

    if(tkn){ //yes loggedin
        let tokenValue = tkn.slice(7, tkn.length).trimLeft();
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                console.log("verification Not Successful");
                return res.status(403).json({ message: 'Forbidden. Invalid token.' });
            }
            console.log("verification Successful");
            console.log("verificationob username:", decoded.username)
            // Attach user information to request object
            req.user = decoded;
            next();
          });
        
    }else{ //No not login
        console.log("verification Not Successful");
        return res.status(401).json({"message":"No token found. You need to login with your username and password "})
    }
});
 
const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
