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

// Add a song to room
///:room_id/:song_id/
router.post('/add/:room_id/:song_id', async (req, res) => {
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

// Remove a song from queue
router.post('/remove/:room_id/:song_id', async (req,res) =>{
    let room_id = req.params.room_id;
    let song_id = req.params.song_id;
    
    let room = await Room.findOne({number: room_id, "queue.song_id": song_id});
    if (!room) {
        return res.status(404).send({error: 'Song is not in the queue.'});
    }

    try{
        await Room.findOneAndUpdate({number: room_id}, { $pull: { queue: { song_id: song_id}}});
        return res.status(200).send({message: 'Song deleted from queue.'})
    }catch(e){
        return res.status(400).send({error: 'Could not delete song from queue.'});
    }

});

router.post('/vote/:room_id/:song_id/:vote', async (req, res) => {
    let room_id = req.params.room_id;
    let song_id = req.params.song_id;
    let vote = parseInt(req.params.vote);

    let room;
    let song;
    
    if (vote !== 1 && vote !== -1) {
        return res.status(400).send({error: 'Invalid vote code.'});
    }

    // Check to see if room exists
    try {
        room = await Room.findOne({number: room_id});
    } catch (e) {
        return res.status(400).send({error: 'Room does not exist.'});
    }

    // Check to see if song exists
    try {
        song = await Room.findOne({number: room_id, 'queue.song_id': song_id});
    } catch (e) {
        return res.status(400).send({error: 'Song does not exist.'});
    }
    
    // Update vote count
    let incrementAmount = vote;
    try {
        await Room.findOneAndUpdate({number: room_id, 'queue.song_id': song_id}, { $inc: {'queue.$.votes': incrementAmount}});
        return res.status(200).send({message: `Voted for song ${song_id}`});
    } catch (e) {
        return res.status(400).send({error: 'Could not update vote count.'});
    }
});

module.exports = router;