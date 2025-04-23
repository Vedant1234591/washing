const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 200
  },
  answer: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 500
  },
  keywords: {
    type: [String],
    required: true,
    validate: {
      validator: v => v.length > 0,
      message: 'At least one keyword required'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('FAQ', faqSchema);