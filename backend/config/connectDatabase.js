const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect(process.env.DB_URL).then((res) => {
        console.log("DB connected successfully")
        // console.log(res)
    }).catch(err => {
        // console.log(err)
    })
}

module.exports=connectDatabase;