const mongoose = require('mongoose');

const uri = "mongodb://db:ig843sbi%26%23yf865@ac-6kyppkb-shard-00-00.kizqqar.mongodb.net:27017,ac-6kyppkb-shard-00-01.kizqqar.mongodb.net:27017,ac-6kyppkb-shard-00-02.kizqqar.mongodb.net:27017/ecommerce?ssl=true&authSource=admin&retryWrites=true&w=majority";

mongoose.connect(uri, { serverSelectionTimeoutMS: 5000, family: 4 })
  .then(() => {
    console.log("Connected successfully!");
    process.exit(0);
  })
  .catch(err => {
    console.error("Connection failed:", err);
    process.exit(1);
  });
