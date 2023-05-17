const mongoose = require('mongoose');
const Loan = require('../models/loan.model');
const UserRequest = require('../models/user_request.model');

// Create and Save a new Loan
exports.create = (req, res) => {
  const fullName = req.body.fullName;
  const email = req.body.email;
  const selectedLoanId = req.body.selectedLoanId;
  const loanAmount = req.body.loanAmount;
  const loanDeadline = req.body.loanDeadline;
  const salary = req.body.salary;

  if (
    !fullName ||
    !email ||
    !salary ||
    !loanAmount ||
    !loanDeadline ||
    !selectedLoanId
  ) {
    res
      .status(400)
      .send({ message: 'Լրացրեք բոլոր դաշտերը։', status: 'error' });
    return;
  }

  Loan.findById(selectedLoanId).then((data) => {
    if (!data) {
      res.status(400).send({
        message: 'Ադպիսի վարկի տեսակ չի գտնվել!',
        status: 'error',
      });

      return;
    }

    if (loanAmount < data.amount.min || loanAmount > data.amount.max) {
      res.status(400).send({
        message: 'Վարկի գումարի անհամապատասխանեցում!',
        status: 'error',
      });

      return;
    }

    if (loanDeadline < data.deadline.min || loanDeadline > data.deadline.max) {
      res.status(400).send({
        message: 'Ժամկետի անհամապատասխանեցում!',
        status: 'error',
      });

      return;
    }

    if (loanAmount / loanDeadline > salary) {
      res.status(400).send({
        message: 'Նշված աշխատավարձի չափը չի բավականացնում!',
        status: 'error',
      });

      return;
    }

    const userRequestDetails = new UserRequest({
      fullName,
      email,
      salary,
      loanId: mongoose.Types.ObjectId(selectedLoanId),
      loanAmount,
      loanDeadline,
    });

    userRequestDetails.save((err) => {
      if (!err) {
        res.send({
          full_name: fullName,
          status: 'success',
        });
      } else {
        res.status(400).send({
          message: 'Խնդրում ենք փորձել կրկին!',
          status: 'error',
        });
      }
    });
  });
};

// Retrieve all Loan from the database.
exports.findAll = (req, res) => {
  Loan.find().then((data) => {
    res.send({
      loanList: data,
      status: 'success',
    });
  });
};

// Find a single User with an id
exports.findOne = (req, res) => {};

// Update a User by the id in the request
exports.update = (req, res) => {};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  // ...
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {};
