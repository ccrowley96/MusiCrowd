const express = require('express');
const randomstring = require("randomstring");
const router = express.Router();

const {mongoose} = require('./../db/mongoose')
const {Room} = require('./../db/models/rooms')

const _ = require('lodash');

router.get('/', (req, res, next) => {
    res.send("Welcome to our API");
});

// Creates room
router.post('/create_room', async (req, res) => {
    // Grab from body auth token
    let auth_token = req.body.token;
    // Test data
    let queue = [];

    // Create unique room number
    let party_code = randomstring.generate(6).toLowerCase();   

    // Create new room
    let room = await new Room({party_code: party_code, queue: queue, auth_token: auth_token}).save();
    
    res.status(200).send({party_code});
});

// Deletes room
router.delete('/delete_room/:party_code', async (req, res) => {
    // Get room to delete
    let party_code = req.params.party_code;

    await Room.deleteOne({party_code: party_code});

    res.status(200).send();
});

// Returns sorted queue
router.get('/queue/:party_code', async (req, res) => {
    let party_code = req.params.party_code;

    let room = await Room.findOne({party_code: party_code});
    let queue = room.queue;

    queue.sort((song1, song2) => {return song2.votes - song1.votes});

    res.status(200).send(queue);
});

// Add a song to room
router.post('/add_song', async (req, res) => {
    
    let party_code = req.body.party_code;
    let song_id = req.body.song.id;

    let room = await Room.findOne({party_code: party_code, "queue.song_id": song_id});
    if (room) {
        return res.status(400).send({error: 'Song is already in queue!'});
    }

    let song = {
        song_id: song_id,
        votes: 0,
        song_payload: req.body.song
    }

    try {
        await Room.findOneAndUpdate({party_code: party_code}, { $push: { queue: song }})
        return res.status(200).send({message: 'Song added to queue!'});
    } catch (e) {
        return res.status(400).send({error: 'Could not add song to queue'});
    }
});

// Remove a song from queue
router.post('/remove_song', async (req,res) =>{
    let party_code = req.body.party_code;
    let song_id = req.body.song.id;
    
    let room = await Room.findOne({party_code: party_code, "queue.song_id": song_id});
    if (!room) {
        return res.status(404).send({error: 'Song is not in the queue.'});
    }

    try{
        await Room.findOneAndUpdate({party_code: party_code}, { $pull: { queue: { song_id: song_id}}});
        return res.status(200).send({message: 'Song deleted from queue.'})
    }catch(e){
        return res.status(400).send({error: 'Could not delete song from queue.'});
    }

});

// Vote on song
router.post('/vote', async (req, res) => {
    let vote = req.body.vote;
    let party_code = req.body.party_code;
    let song_id = req.body.song.id;

    let room;
    let song;
    
    if (vote !== 1 && vote !== -1) {
        return res.status(400).send({error: 'Invalid vote code.'});
    }

    // Check to see if room exists
    try {
        room = await Room.findOne({party_code: party_code});
    } catch (e) {
        return res.status(400).send({error: 'Room does not exist.'});
    }

    // Check to see if song exists
    try {
        song = await Room.findOne({party_code: party_code, 'queue.song_id': song_id});
    } catch (e) {
        return res.status(400).send({error: 'Song does not exist.'});
    }
    
    // Update vote count
    let incrementAmount = vote;
    try {
        await Room.findOneAndUpdate({party_code: party_code, 'queue.song_id': song_id}, { $inc: {'queue.$.votes': incrementAmount}});
        return res.status(200).send({message: `Voted for song ${song_id}`});
    } catch (e) {
        return res.status(400).send({error: 'Could not update vote count.'});
    }
});

router.get('/nextsong/:party_code/', async (req, res) => {
    let party_code = req.params.party_code;

    // Check to see if room exists
    try {
        room = await Room.findOne({party_code: party_code});
    } catch (e) {
        return res.status(400).send({error: 'Room does not exist.'});
    }

    try {
        let room = await Room.findOne({party_code: party_code});
        if (room.queue.length === 0) {
            return res.status(400).send({error: 'No songs in queue.'})
        }
        max = 0;
        song_id = 0;
        for (i = 0; i < room.queue.length; i++) {
            if (room.queue[i].votes >= max) {
                max = room.queue[i].votes;
                song_id = room.queue[i].song_id;
            }
        }
        res.status(200).send(song_id);
    } catch (e) {
        res.status(400).send({error: 'Could not retrieve latest song.'})
    }
});

module.exports = router;