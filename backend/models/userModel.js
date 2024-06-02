const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 40,
      },
      email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 200,
        unique: true,
      },
      password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,
      }, 
})

const userModel = mongoose.model('Order', userSchema)

module.exports = userModel;