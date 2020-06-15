# Popify

Site can be accessed at: [https://popify.netlify.app/](https://popify.netlify.app/)

## A web app for searching Spotify's music database

<img src='public/popifyScreenshot.png'>

This is the source code for the back-end portion of the Popify portfolio project. This site is a simple demonstration of consumption of API data, and the use of OAauth 2.0 for access control.

the front end is **React.js**, deployed on the Netlify hosting platform. MobX is used for state management, Styled Components is used for CSS management, and 'lazy loading' has been implemented on displayed images to improve loading performance.

The back end is a **NodeJS** server. The source code for the back-end cand be viewed at [https://github.com/stuart-p/popify_server](https://github.com/stuart-p/popify_server).

## Usage

The site is designed by be accessed by a web browser [here](https://popify.netlify.app).

### Pages and Functions

The user first hits the landing page, which contains a bold header and a basic explanation of the app.

The header contains nav links to home (current page) and search (search is disabled if not logged in).

The header also has a login/logout button at the top. Pressing this will redirect the user to an OAuth login prompt from Spotify, via the Popify back-end server. Once logged in the user can freely browse to the search page.

The search page contains the main functionality of the application. A search bar at the top allows the user to type in search queries, and a selection bar allows the user to search in a particular category. On pressing submit or enter, the requested data is retrieved and displayed to the user in a grid format below. A footer contains 'forward' and 'backwards' buttons to allow the user to browse multiple pages of results.

### Local deployment

To run the app locally, clone down the client and server code, navigate to the folders in turn and run `npm install` to install all the dependencies.

Both client and server will require environmental variables to be set. Create a file called `.env` in the root of each project, and add the following variables:

1. CLIENT

- `REACT_APP_AUTH_SERVER=http://localhost:PORTNUM/auth/login` (replace PORTNUM with your desired server port settings, default 8080 )

2. SERVER

- `client_id=SPOTIFY CLIENT ID` (add your Spotify developer Client ID here)
- `client_secret=SPOTIFY SECRET`(add your Spotify developer Client Secret here)
- `redirect_uri=http://localhost:PORTNUM/auth/callback` (Replace PORTNUM with server port settings, default 8080)
- `frontend_uri=http://localhost:PORTNUM` (Replace PORTNUM with client port settings, default 3000)

Run `npm start` in both client and server root directories to start a local instance of the application. Then navigate to `http://localhost:3000` (or whatever port number you are using client-side) to access the site.

## Prerequisites

This project requires `NodeJS`, minimum version V12. It has the following dependencies (these will automatically be install if using `npm install` command)

```
production dependencies:
    "axios": "^0.19.2",
    "cookie-parser": "^1.4.5",
    "cors": "^2.8.5",
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "querystring": "^0.2.0"
}
```

## Built with

This project was built with VS Code, using Javascript and the Express.js back-end library.

## Author

This project was built by **Stuart Palmer** as a demonstration of OAuth functionality in June 2020.
