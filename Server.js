const express = require(`express`);
const app = express();
require("dotenv").config();
const ErrorHandler = require(`./Util/ErrorHandler`);
const GlobalError = require(`./Middleware/GlobalError`);
const cors = require(`cors`);
const Payment = require(`./Util/Payment`);
const Connect_db = require(`./config/ConnectDatabase`);
Connect_db();

app.use(express.json());
app.use(cors());

const CategoryRoute = require(`./Routes/CategoryRoute`);
const SubcategoryRoute = require(`./Routes/SubcategoryRoute`);
const BrandRoute = require(`./Routes/BrandRoute`);
const ProductRoute = require(`./Routes/ProductRoute`);
const UserRoute = require(`./Routes/UserRoute`);
const AuthRoute = require(`./Routes/AuthRoute`);

app.use(`/Api/v1/category`, CategoryRoute);
app.use(`/Api/v1/subcategory`, SubcategoryRoute);
app.use(`/Api/v1/brand`, BrandRoute);
app.use(`/Api/v1/product`, ProductRoute);
app.use(`/Api/v1/user`, UserRoute);
app.use(`/Api/v1/user`, AuthRoute);

app.post(`/api/v1/payment`, Payment);

app.all(`*`, (req, res, next) => {
  const Error = new ErrorHandler(
    `This ${req.originalUrl} Not Exist`,
    404,
    "Error"
  );
  return next(Error);
});

app.use(GlobalError);

const server = app.listen(process.env.SERVER_PORT || 5000, () => {
  console.log("connected server");
});
process.on(`unhandledRejection`, () => {
  server.close(() => {
    process.exit(1);
  });
});
