const express = require('express');
const jwt = require(`jsonwebtoken`);

const jwtverify = (req,res,next)=>{
    const token = req.headers.authorization.split(' ')[1];
    if(!token){
        return res.send("Token not found")
    }
    else{
        try{
            var decoded = jwt.verify(token,process.env.JWTKEY);
            res.user = decoded.name;
            next();

        }
        catch(error){
            res.redirect('/');
        }
    }
}
const jwtgenerate = (username)=>{
    return jwt.sign({name:username},process.env.JWTKEY);
}
module.exports = { jwtgenerate, jwtverify }