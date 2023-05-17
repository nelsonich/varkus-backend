const mongoose = require('mongoose');

const UserRequestSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    salary: { type: Number, required: true },
    loanId: { type: mongoose.Schema.Types.ObjectId, required: true },
    loanAmount: { type: Number, required: true },
    loanDeadline: { type: Number, required: true },
  },
  { timestamps: true }
);

UserRequestSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = mongoose.model('user_request', UserRequestSchema);
