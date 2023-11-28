const mongoose = require(`mongoose`);

const subcategory = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: {
      type: String,
      require: true,
      unique: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: `Category`,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(`Subcategory`, subcategory);
