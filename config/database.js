// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/trades', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });
	
// // shortcut to mongoose.connection object
// const db = mongoose.connection;
	
// db.on('connected', function() {
//   console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
// });

const mongoose = require('mongoose');

// replace your database connection string here
mongoose.connect(process.env.SERVER_URL,{ 
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  // useCreateIndex: true
});

const db = mongoose.connection;

// database connection event
db.on('connected', function () {
  console.log(`Mongoose connected to: ${db.host}:${db.port}`);
});