#RESTful backend (expressJS) and Frontend (Angular 7) for google-recaptcha 

## to install node dependencies
`npm install`
`cd amtica-google-captcha`
## then install dependencies for frontend
`npm install` 
install mongoDB server and run it at `port 27015` 
## to run the frontend and backend together
`npm run dev`

## there are key features for this web app
### Backend
Authentication is done using JWT.
Backend is RESTful and stateless.
I've used a part of the backend (I created for conducting a Computer Adapative Quiz).

### Frontend
If user is not logged-in (the initial case), you will be re-directed to `/home` route.
There you have two options, to sign-up and login.
For `sign-up` pruposes I've added a `Test-data` button to automatically fill in the details with a random username string and password as password. You cannot register without verifying the reCaptcha.
After sign-up you will be redirected to the `/user` where personal details for the user is shown.
`/user` route is guarded, if user if not logged in you will be redirected to `/login` route.
If user is logged in `/login` and `/signUp` routes won't be accessible.

