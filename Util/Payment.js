const stripe = require(`stripe`)(process.env.STRIPE_SECRET);
const payment = async (req, res) => {
  const { amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntent.create({
      amount,
      currency: `usd`,
    });
    res.status(200).json({ Status: "Success", Data: { paymentIntent } });
  } catch (error) {
    res.status(500).json({ Status: "Fail", Message: error.Message });
  }
};
module.exports = payment;
