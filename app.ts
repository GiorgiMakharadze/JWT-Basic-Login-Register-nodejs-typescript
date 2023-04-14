import express from "express";
import "express-async-errors";
import "dotenv/config";
import morgan from "morgan";
import { errorHandlerMiddleware } from "./api/middleware/error-handler";
import { notFound } from "./api/middleware/not-found";

const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(express.static("./public"));
app.use(express.json());
app.use(morgan("dev"));

app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
