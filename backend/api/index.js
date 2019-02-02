const express = require('express');
const router = express.Router();
const _ = require('lodash');

let data = [];

router.get('/', (req, res, next) => {
    res.send("Welcome to our API");
});

// Create room
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

// Delete Room
router.post('/delete_room/:room_id', (req, res, next) => {
    // Get room to delete
    let room_id = req.params.room_id;

    // Filter through data and remove room to be deleted
    data = _.remove(data, (room) => {
        if(room.roomNumber != room_id){
            return true; 
        }
    });

    // Print data for debugging
    console.log('data after deletion', data);
    res.status(200).send();
});


router.get('/:roomId/queue', async (req, res) => {
    let roomID = req.params.id;

});

module.exports = router;