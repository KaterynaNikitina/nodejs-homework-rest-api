import mongoose from 'mongoose';
import app from "./app.js";

// const DB_HOST = 'mongodb+srv://Kateryna:H4ymUwsRaebL75m2@cluster0.8rqlkqp.mongodb.net/my-contacts?retryWrites=true&w=majority';

mongoose.connect(process.env.DB_HOST)
.then (() => {
  app.listen(3000, () => {
    console.log("Server running. Use our API on port: 3000")
  })
})
.catch(error => {
  console.log(error.message);
  process.exit(1);
}) ;



// H4ymUwsRaebL75m2