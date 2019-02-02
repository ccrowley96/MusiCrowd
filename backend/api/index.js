const express = require('express');
const router = express.Router();

const {mongoose} = require('./../db/mongoose')
const {Room} = require('./../db/models/rooms')

const _ = require('lodash');

router.get('/', (req, res, next) => {
    res.send("Welcome to our API");
});

// Creates room
router.post('/create_room', async (req, res) => {
    // Test data
    let queue = [{
        song_id: 69,
        votes: 4
    }, {
        song_id: 100,
        votes: 5
    }];

    // Create new room
    let allRooms = await Room.find({});
    let numberOfRooms = allRooms.length;
    let roomNumber = numberOfRooms + 1;
    let room = await new Room({number: roomNumber, queue: queue}).save();
    
    res.status(200).send({roomNumber});
});

// Deletes room
router.delete('/delete_room/:room_id', async (req, res) => {
    // Get room to delete
    let room_id = req.params.room_id;

    await Room.deleteOne({number: room_id});

    res.status(200).send();
});

// Returns sorted queue
router.get('/:room_id/queue', async (req, res) => {
    let room_id = req.params.room_id;

    let room = await Room.findOne({number: room_id});
    let queue = room.queue;

    queue.sort((song1, song2) => {return song2.votes - song1.votes});

    res.status(200).send(queue);
});

module.exports = router;