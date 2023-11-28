const mongoose = require(`mongoose`);

const product = new mongoose.Schema(
  {
    title: {
      type: String,
      require: [true, "YOU Should Enter Value"],
      minimum: 7,
      maximum: 30,
    },
    slug: {
      type: String,
      require: true,
      minimum: 7,
      maximum: 30,
    },
    description: {
      type: String,
      require: true,
      minimum: 15,
      maximum: 100,
    },
    price: {
      type: Number,
      require: true,
      minimum: 1,
    },
    image: {
      type: String,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: `Category`,
      require: true,
    },
    rate: {
      type: Number,
      min: 1,
      max: 5,
    },
    subcategory: [
      {
        type: mongoose.Schema.ObjectId,
        ref: `Subcategory`,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model(`Product`, product);
