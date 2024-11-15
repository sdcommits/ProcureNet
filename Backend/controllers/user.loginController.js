const { jwtgenerate } = require("../middlewares/jwt");
const RegisterModel = require("../models/user.model")
const bcrypt = require('bcrypt');

const loginUser = async (req, res,next) => {
    console.log(req.body);

    const { email, password } = req.body


    const user = await RegisterModel.find({ "personalDetails.email": email });

    console.log(user);
    if (user.length == 0) {
        const err=new Error("user not found");
        err.statusCode=404;
        next(err);
        //res.send('User Not Found')
    }
    else {
        console.log(password);
        console.log(user[0].personalDetails.password);
        bcrypt.compare(password, user[0].personalDetails.password, function (err, result) {
            if (err) {
                res.send('Hash not generated')
                return
            }
            else if (result) {
                var token = jwtgenerate(user[0].personalDetails.name)
                console.log(token)
                res.send({ message: "Login Successfull", token: token })
            }
            else {
                res.send("Login Failed Either username or password is incorrect")
            }
        });
    }


}
module.exports = loginUser