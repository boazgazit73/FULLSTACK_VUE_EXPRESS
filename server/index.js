const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//Middleware
app.use(bodyParser.json());
app.use(cors());

const posts = require('./routes/api/posts');
app.use('/api/posts', posts);

const users = require('./routes/api/users');
app.use('/api/users', users);

// Handle production
if (process.env.NODE_ENV == 'production')   {
    // Static folder
    app.use(express.static(__dirname + '/public/'));

    // Handle SPA
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

//Port: Heruko type
const port = process.env.PORT || 5000;

// Start web app 
app.listen(port, () => console.log(`Server started on port ${port}`));


