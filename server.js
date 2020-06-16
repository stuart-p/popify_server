require("dotenv").config();
const express = require("express");
const server = express();
const { PORT = 8080 } = process.env;
const { authRouter } = require("./routes/auth_router");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./error_handlers/errorHandler");

//server middleware
server.use(cors());
server.use(express.json());
server.use(cookieParser());
server.use("/auth", authRouter);

//middleware error handling
server.use("/", errorHandler.unauthorisedMethod);
server.use(errorHandler.internalErrorHandler);
server.use(errorHandler.genericError);

//server startup function
server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
