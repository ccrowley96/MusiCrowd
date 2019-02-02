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

router.post('/add/:room_id/:song_id/', async (req, res) => {
    let room_id = req.params.room_id;
    let song_id = req.params.song_id;

    let room = await Room.findOne({number: room_id, "queue.song_id": song_id});
    if (room) {
        return res.status(400).send({error: 'Song is already in queue!'});
    }

    let song = {
        song_id: song_id,
        votes: 0
    }

    try {
        await Room.findOneAndUpdate({number: room_id}, { $push: { queue: song }}) // IDK
        return res.status(200).send({message: 'Song added to queue!'});
    } catch (e) {
        return res.status(400).send({error: 'Could not add song to queue'});
    }

});

router.post('/remove/:room_id/:song_id', async (req,res) =>{
    let room_id = req.params.room_id;
    let song_id = req.params.song_id;
    
    let room = await Room.findOne({number: room_id, "queue.song_id": song_id});
    if (!room) {
        return res.status(404).send({error: 'Song is not in the queue.'});
    }

    try{
        await Room.findOneAndUpdate({number: room_id}, { $pull: {'queue.song_id': song_id}});
        return resizeTo.status(200).send({message: 'Song deleted from queue.'})
    }catch(e){
        return res.status(400).send({error: 'Could not delete song from queue.'});
    }

});

module.exports = router;