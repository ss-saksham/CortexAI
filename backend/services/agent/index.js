import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./routes/agent.route.js";
dotenv.config();

const formatUrl = (url) => {
  if (url && !url.startsWith("http://") && !url.startsWith("https://")) {
    return `http://${url}`;
  }
  return url;
};
if (process.env.AUTH_SERVICE) process.env.AUTH_SERVICE = formatUrl(process.env.AUTH_SERVICE);
if (process.env.CHAT_SERVICE) process.env.CHAT_SERVICE = formatUrl(process.env.CHAT_SERVICE);

const app = express();
app.use(express.json());
const port=process.env.PORT

app.use("/",router);

app.use((err, req, res, next) => {

  console.error(err);

  if (err.status) {

    return res
      .status(err.status)
      .json(err.data);

  }

  return res
    .status(500)
    .json({

      success: false,

      message: err.message || "Internal Server Error"

    });

});

app.listen(port, () => {
    connectDB()
  console.log(
    `agent service running on ${port}`
  );
});
