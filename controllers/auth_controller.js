const { generateRandomString } = require("../utils/utilityFunctions");
const axios = require("axios");
const { client_id, client_secret, redirect_uri } = process.env;
const querystring = require("querystring");
const stateKey = "spotify_auth_state";

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

exports.loginCallback = (req, res, next) => {
  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect("/#" + querystring.stringify({ error: "state_mismatch" }));
  } else {
    res.clearCookie(stateKey);
    const tokenRequestUrl = "https://accounts.spotify.com/api/token";
    const authOptions = querystring.stringify({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirect_uri,
    });
    const header = {
      Authorization:
        "Basic " +
        Buffer.from(client_id + ":" + client_secret).toString("base64"),
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

        // just test it works
        const profileURL = "https://api.spotify.com/v1/me";
        const header = {
          headers: {
            Authorization: "Bearer " + access_token,
          },
        };

        return axios.get(profileURL, header);
      })
      .then((data) => {
        console.log("DATA RECEIVED FROM SPOTIFY!!!!=====================>");
        console.log(data);
      })
      .catch((err) => {
        console.log("ERROR==========================>");
        console.log(err);
      });
  }
};

exports.refreshRequest = (req, res, next) => {};
