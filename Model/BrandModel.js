const mongoose = require(`mongoose`);

const Brand = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "This Name Required"],
      unique: [true, "This Name Must Be a Unique"],
    },
    slug: {
      type: String,
      require: true,
      unique: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(`Brand`, Brand);
