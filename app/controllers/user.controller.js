const User = require('../models/user.model');

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (
    !req.body.name.first ||
    !req.body.name.last ||
    !req.body.email ||
    !req.body.password
  ) {
    res.status(400).send({ message: 'Content can not be empty!' });
    return;
  }

  // Create a User
  const user = new User({
    name: {
      first: req.body.name.first,
      last: req.body.name.last,
    },
    email: req.body.email,
    password: req.body.password,
  });

  // Save User in the database
  user
    .save(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the User.',
      });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  User.find().then((data) => {
    res.send(data);
  });
};

// Find a single User with an id
exports.findOne = (req, res) => {};

// Update a User by the id in the request
exports.update = (req, res) => {};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  User.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      } else {
        res.send({
          message: 'User was deleted successfully!',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete User with id= + ${id}`,
        error: err,
      });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {};
