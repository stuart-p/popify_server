const authRouter = require("express").Router();
const {
  loginRequest,
  loginCallback,
  refreshRequest,
} = require("../controllers/auth_controller");

authRouter.route("/login").get(loginRequest);

authRouter.route("/callback").get(loginCallback);

authRouter.route("/refresh_token").get(refreshRequest);

module.exports = { authRouter };
