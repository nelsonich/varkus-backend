module.exports = (app) => {
  const loan = require('../app/controllers/loan.controller.js');

  const router = require('express').Router();

  // Create a new Loan
  router.post('/', loan.create);

  // Retrieve all loan
  router.get('/', loan.findAll);

  // Retrieve a single Loan with id
  router.get('/:id', loan.findOne);

  // Update a Loan with id
  router.put('/:id', loan.update);

  // Delete a Loan with id
  router.delete('/:id', loan.delete);

  // Delete all Loan
  router.delete('/', loan.deleteAll);

  app.use('/api/loan', router);
};
