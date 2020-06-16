const authRouter = require("express").Router();
const {
  loginRequest,
  loginCallback,
  refreshRequest,
} = require("../controllers/auth_controller");

const errorHandler = require("../error_handlers/errorHandler");

authRouter
  .route("/login")
  .get(loginRequest)
  .all(errorHandler.unauthorisedMethod);

authRouter
  .route("/callback")
  .get(loginCallback)
  .all(errorHandler.unauthorisedMethod);

authRouter
  .route("/refresh_token")
  .get(refreshRequest)
  .all(errorHandler.unauthorisedMethod);

authRouter.route("/").all(errorHandler.unauthorisedMethod);

module.exports = { authRouter };
