const mongoose = require(`mongoose`);

const category = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },
    slug: {
      type: String,
      require: true,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(`Category`, category);
