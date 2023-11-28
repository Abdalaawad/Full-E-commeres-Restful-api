const mongoose = require(`mongoose`);

const connect = async () => {
  await mongoose.connect(process.env.MONGO_CONNECT).then(() => {
    console.log("Connected Database");
  });
};
module.exports = connect;
