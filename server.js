import express, { response } from 'express';
import bcrypt from 'bcrypt';
import cors from 'cors';
import knex from 'knex';
import { handleRegister } from './controllers/register.js';
import { handleSignin } from './controllers/signin.js';
import { handleProfile } from './controllers/profile.js';
import { handleImageCount, handleApiCall } from './controllers/image.js';

const db = knex({
    client: 'pg',
    connection: {
      host : process.env.DATABASE_URL,
      ssl: true
    }
});  

const app = express();

app.use(express.json());
app.use(cors());

// The following is for the home page and it simply sends a message if the server is running

app.get('/', (req, res) => {
    // db.select('*').from('users')
    //     .then(user => {
    //         res.json(user)
    //     })
    res.send("it's working!");
})

/* 
The following is for the signin page and it sends a json response of 'success' if the email and 
password entered are present in the database otherwise a response of 'error logging in'
*/


app.post('/signin', (req, res) => {handleSignin(req, res, db, bcrypt)});

/* 
The following is for the register page which adds to our database the information about the newly
registered user.
*/

app.post('/register', (req, res) => {handleRegister(req, res, db, bcrypt)} );
/* 
The following is for the profile which gives info about the signed in user
*/

app.get('/profile/:id', (req, res) => {handleProfile(req, res, db)});

/* 
The following is for the image which updates the entries in the signed in user
*/

app.put('/image', (req, res) => {handleImageCount(req, res, db)});

/* 
The following is for the image API calls which was moved to the backend to not display 
the API key in the network tab
*/

app.post('/imageurl', (req, res) => {handleApiCall(req, res)});

app.listen(process.env.PORT || 3000, () => {
    console.log('app is running on port ${process.env.PORT}');
});