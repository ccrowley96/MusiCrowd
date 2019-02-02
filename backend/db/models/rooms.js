const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
    number: {
      type: Number,
      required: true
    },    
    queue: [{
        song_id : {
          type: String,
          required: true
        }, 
        votes: {
          type: Number,
          required: true
        }
    }]
  });
  
  const Room = mongoose.model('Room', roomSchema);

  module.exports = {Room}
