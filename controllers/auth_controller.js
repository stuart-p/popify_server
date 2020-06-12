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

  console.log(code, state, storedState);
  if (state === null || state !== storedState) {
    res.redirect("/#" + querystring.stringify({ error: "state_mismatch" }));
  } else {
    res.clearCookie(stateKey);
    const tokenRequestUrl= "https://accounts.spotify.com/api/token",
    const authOptions = {
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code",
      }};
     const header ={ 
       headers: {
        Authorization:
          "Basic " +
          new Buffer(client_id + ":" + client_secret).toString("base64"),
      }
    };

    return axios.post(tokenRequestUrl,authOptions, header).then((err, res)=>{
console.log(res)
    })
  }
};

exports.refreshRequest = (req, res, next) => {};
