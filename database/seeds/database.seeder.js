const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
require('colors');
const db = require('../../config/db.config');

// Load ENV variables
dotenv.config({ path: path.join(__dirname, '/../../.env') });

// Load Models
const User = require('../../app/models/user.model');
const Loan = require('../../app/models/loan.model');

// // Connect to Mongo Database
db().then();

// Read The JSON files
const users = JSON.parse(
  fs.readFileSync(path.join(__dirname, '/users.seeder.json'), 'utf-8')
);
const loan = JSON.parse(
  fs.readFileSync(path.join(__dirname, '/loan.seeder.json'), 'utf-8')
);

// Import Sample Data In DB
const importData = async () => {
  try {
    await Promise.all([
      User.create(users).then(() => {
        console.log('User list successfully imported'.green.inverse);
      }),
      Loan.create(loan).then(() => {
        console.log('Loan list successfully imported'.green.inverse);
      }),
    ]);

    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// Delete the data from DB
const deleteData = async () => {
  try {
    await Promise.all([
      User.deleteMany().then(() => {
        console.log('User list successfully deleted'.red.inverse);
      }),
      Loan.deleteMany().then(() => {
        console.log('Loan list successfully deleted'.red.inverse);
      }),
    ]);

    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '-i') {
  importData().then();
} else if (process.argv[2] === '-d') {
  deleteData().then();
}
