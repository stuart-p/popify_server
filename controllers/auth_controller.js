const { generateRandomString } = require("../utils/utilityFunctions");
const axios = require("axios");
const { client_id, client_secret, redirect_uri, frontend_uri } = process.env;
const querystring = require("querystring");
const stateKey = "spotify_auth_state";

//controller used when client initiates an OAuth request
exports.loginRequest = (req, res, next) => {
  const state = generateRandomString(16);
  const scope = "user-top-read user-read-recently-played user-library-read";
  res.cookie(stateKey, state);
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
      })
  );
};

//controller used when Spotify calls back to server with OAuth details
exports.loginCallback = (req, res, next) => {
  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    next({ status: 401, msg: "Unauthorised. state mismatch" });
  } else {
    res.clearCookie(stateKey);
    const tokenRequestUrl = "https://accounts.spotify.com/api/token";
    const authOptions = querystring.stringify({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirect_uri,
    });
    const header = {
      Authorization: `Basic ${Buffer.from(
        client_id + ":" + client_secret
      ).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    };

    return axios({
      method: "post",
      url: tokenRequestUrl,
      data: authOptions,
      headers: header,
    })
      .then(({ data }) => {
        const access_token = data.access_token;
        const refresh_token = data.refresh_token;
        res.redirect(
          `${frontend_uri}?${querystring.stringify({
            access_token,
            refresh_token,
          })}`
        );
      })
      .catch((err) => {
        next({ status: 401, msg: "Unauthorised, Spotify rejected request" });
      });
  }
};

exports.refreshRequest = (req, res, next) => {};
