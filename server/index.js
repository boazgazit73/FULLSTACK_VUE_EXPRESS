const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//Middleware
app.use(bodyParser.json());
app.use(cors());

const posts = require('./routes/api/posts');
app.use('/api/posts', posts);

// Handle production
if (process.env.NODE_ENV == 'production')   {
    // Static folder
    app.use(express.static(__dirname + '/public/'));

    // Handle SPA
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}heroku

//Port: Heruko type
const port = process.env.port || 5000;

// Start web app 
app.listen(port, () => console.log(`Server started on port ${port}`));


