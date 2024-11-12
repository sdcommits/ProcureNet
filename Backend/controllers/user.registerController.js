const RegisterModel = require("../models/user.model");
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Function to generate a unique user ID
function generateUserId() {
    return crypto.randomBytes(3).toString('hex');
}

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: 'shashi.shekhar270902@gmail.com', // Your email
        pass: 'neac qbhu iqtd liio' // Your app-specific password
    }
});

const createUser = async (req, res) => {
    if (!req.body.personalDetails) {
        req.body.personalDetails = {};
    }
    req.body.personalDetails.userId = generateUserId();

    const {
        personalDetails: {
            name,
            email,
            dob,
            password,
            cpassword,
            userId,
        },
        authenticationDetails: {
            aadharCardNumber,
        }
    } = req.body;

    if (password !== cpassword) {
        return res.status(400).send('Password mismatch');
    }

    try {
        const saltround = 10;
        const hash = await bcrypt.hash(password, saltround);

        const user = new RegisterModel({
            personalDetails: {
                name: name,
                email: email,
                dob: dob,
                password: hash,
                userId: userId
            },
            authenticationDetails: {
                aadharCardNumber: aadharCardNumber,
            }
        });

        await user.save();

        const mailOptions = {
            from: 'shashi.shekhar270902@gmail.com',
            to: email,
            subject: 'Registration Successful',
            html: `<p>Dear ${name},</p>
                   <p>Thank you for registering! Your account has been successfully created.</p>
                   <p><strong>User ID:</strong> ${userId}</p>
                   <p>Best regards,<br>ProcureNet</p>`,
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                return res.status(500).send('Error sending email');
            } else {
                console.log('Email sent: ' + info.response);
                return res.status(200).json({ message: 'Registration successful and email sent!' });
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).send('Error during registration');
    }
};

module.exports = { createUser };
