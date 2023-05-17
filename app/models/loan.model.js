const mongoose = require('mongoose');

const LoanSchema = new mongoose.Schema(
  {
    name: String,
    type: String,
    amount: {
      min: Number,
      max: Number,
    },
    deadline: {
      min: Number,
      max: Number,
    },
  },
  { timestamps: true }
);

LoanSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = mongoose.model('loan', LoanSchema);
