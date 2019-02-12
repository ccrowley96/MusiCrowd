const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
      expireAt: {
        type: Date,
        default: function() {
          // 12 hours seconds from now is 12*60*60*1000 milliseconds
          return new Date(new Date().valueOf() + (12*60*60*1000));
      }
    },
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
    }],
    currently_playing: {
      type: Object
    }
  });

  // Expire at the time indicated by the expireAt field
  roomSchema.index({ expireAt: 1 }, { expireAfterSeconds : 0 });
  
  const Room = mongoose.model('Room', roomSchema);
  module.exports = {Room}
