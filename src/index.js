import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import majorRoute from "./routes/majorRoute.js"
import subjectRoute from "./routes/subjectRoute.js"
import userRoute from "./routes/userRoute.js"
import accountRoute from "./routes/accountRoute.js"
import conversationRoute from"./routes/conversationRoute.js"
import messageRoute from"./routes/messageRoute.js"
import cors from "cors"

const app = express();

// Middleware for parsing request body
app.use(express.json());
app.use(cors());

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("This is API of StuTo App - belongs to ThangDev03");
});

app.use("/major", majorRoute);
app.use("/subject", subjectRoute);
app.use("/user", userRoute);
app.use("/account", accountRoute);
app.use("/conversations", conversationRoute);
app.use("/messages", messageRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
