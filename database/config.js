const mongoose = require('mongoose');

const dbConnection = async () => {

  try {
    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true
      // useCreateIndex: true,
      // useFindAndModify: false
    });
    console.log('~~~~ Database online ~~~~')

  } catch (error) {
    console.log("Error: ", error);
    throw new Error('error while connecting to the database');
  }
}

module.exports = {
  dbConnection
}