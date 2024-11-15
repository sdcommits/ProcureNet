const mongoose = require('mongoose')
require('dotenv').config()
const main = async (req, res) => {
    try {
        await mongoose.connect(`mongodb+srv://shashishekhar270902:Shashi.27@cluster0.u0quy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
        console.log('Database Connected')
    } catch (error) {
        console.log(error)
    }
}
module.exports = main;
