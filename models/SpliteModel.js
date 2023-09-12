const mongoose = require('mongoose');

const SpliteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50
  },
  amount: {
    type: Number,
    required: true,
    maxLength: 20,
    trim: true
  },
  date: {
    type: Date,
    required: false,
    trim: true
  },
  description: {
    type: String,
    required: true,
    maxLength: 100,
    trim: true
  },
  persons: [
    {
      name: {
        type: String,
        required: true,
        trim: true
      },
      amountPaid: {
        type: Number,
        required: true,
        maxLength:20,
      },
      amountLeft: {
        type: Number,
        required: true,
        maxLength: 20,
      }
    }
  ]
}, { timestamps: true });

const Splite = mongoose.model('Splite', SpliteSchema);

module.exports = Splite;
