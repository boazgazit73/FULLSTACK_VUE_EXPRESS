const express = require('express');
const mongodb = require('mongodb');
const router  = express.Router();

// Get Users
router.get('/', async (req, res) => {
    const Users = await loadUsersCollection();
    // name:req.body.name, surname:req.body.surname, roll:req.body.roll
    res.send(await Users.find({}).toArray()); 
});

// Add Users 
router.post('/', async (req, res) => {
    const Users = await loadUsersCollection();
    await Users.insertOne({
        name: req.body.name,
        surname: req.body.surname,
        user: req.body.user,
        password: req.body.password,
        roll: req.body.roll,         
        text: req.body.text,
        createAt: new Date() 
    });
    res.status(201).send();
});

// Delete Users
router.delete('/:id', async (req, res) => {
    const Users = await loadUsersCollection();
    await Users.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
});

async function loadUsersCollection() {
    const client = await mongodb.MongoClient.connect (
        'mongodb+srv://dbuser:dbuserpwd@cluster0-yiar1.mongodb.net/test?retryWrites=true&w=majority', 
        { useNewUrlParser:true } 
    );
    
    return client.db('vue_express').collection('Users');
    
}

module.exports = router;




