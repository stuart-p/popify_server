require("dotenv").config();
const express = require("express");
const server = express();
const { port = 8080 } = process.env;
const { authRouter } = require("./routes/auth_router");
const cors = require("cors");
const cookieParser = require("cookie-parser");

server.use(cors());
server.use(express.json());
server.use(cookieParser());
server.use("/auth", authRouter);

server.listen(port, () => {
  console.log(`listening on ${port}`);
});
