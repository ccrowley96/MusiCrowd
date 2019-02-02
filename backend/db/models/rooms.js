const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
    party_code: {
      type: String,
      required: true
    },    
    auth_token: {
      type: String,
      required: true
    },
    queue: [{
        song_id : {
          type: String,
          required: true
        }, 
        song_payload : {
          type: Object,
          required: true
        },
        votes: {
          type: Number,
          default: 0
        }
    }]
  });
  
  const Room = mongoose.model('Room', roomSchema);
  module.exports = {Room}
