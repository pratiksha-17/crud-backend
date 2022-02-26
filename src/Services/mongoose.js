const mongoose = require('mongoose');
// const conn = mongoose.createConnection("mongodb://127.0.0.1:27017/Test");
var db = "mongodb://localhost:27017/Test";
const conn = mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });
const conSuccess = mongoose.connection
conSuccess.on("error", console.error.bind(console, "connection error: "));
conSuccess.once("open", function () {
  console.log("Connected successfully");
});
exports.mongoose = mongoose;
exports.conn = conSuccess;