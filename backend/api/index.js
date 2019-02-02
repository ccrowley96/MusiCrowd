const express = require('express');
const router = express.Router();

const {mongoose} = require('./../db/mongoose')
const {Room} = require('./../db/models/rooms')

const _ = require('lodash');

let data = [];

router.get('/', (req, res, next) => {
    res.send("Welcome to our API");
});

router.post('/create_room', async (req, res) => {
    
    // Create new room
    let room = await new Room({number: 2}).save();
    
    res.status(200).send();
});

router.post('/delete_room/:room_id', (req, res, next) => {
    // Get room to delete
    let room_id = req.params.room_id;

    // Filter through data and remove room to be deleted
    data = _.remove(data, (room) => {
            if(room.roomNumber === room_id)
                return true; 
    });

    // Print data for debugging
    console.log(data);
    res.status(200).send();
});


router.get('/:room_id/queue', async (req, res) => {
    let room_id = req.params.room_id;
    // let queue = data.map((room) => {
    //     if (room.roomNumber === room_id) {
    //         return room.
    //     }
    // });
});

module.exports = router;