const mongoose = require("mongoose");
mongoose.set('strictQuery', true);


async function main (username, password) {
  const database = `mongodb+srv://${username}:${password}@cluster0.9fm1l0t.mongodb.net/?retryWrites=true&w=majority`;

  await mongoose.connect(database, {useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('Mongodb connected'))
    .catch(err => console.log(err));
}


module.exports = { main }