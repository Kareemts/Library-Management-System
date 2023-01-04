const mongoose = require('mongoose');

const connection = () => {
  mongoose.connect(
    'mongodb+srv://productlListingApp:MDIhtPw5o1a6srUk@cluster0.wl6jspv.mongodb.net/?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  if (connection) {
    console.log('database connected');
  } else {
    console.log('database connection error');
  }
};

module.exports = { connection };
