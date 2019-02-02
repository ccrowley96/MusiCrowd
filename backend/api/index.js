const express = require('express');
const router = express.Router();

let data = [];

router.get('/', (req, res, next) => {
    res.send("Welcome to our API");
});

router.post('/create_room', (req, res, next) => {
    // Create new room
    let room = {
        roomNumber: data.length,
        queue: []   
    }

    // Add room to data object
    data.push(room);

    // Print data for debugging
    console.log(data);
    res.status(200).send();
});

router.post('/delete_room', (req, res, next) => {

    // Add room to data object
    data.push(room);

    // Print data for debugging
    console.log(data);
    res.status(200).send();
});



module.exports = router;