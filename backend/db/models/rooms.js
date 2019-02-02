const mongoose = require('mongoose');

const rooomSchema = mongoose.Schema({
    number: {
      type: Number,
      required: true
    },    
    queue: [{
      uid : String,
      name : String,
      fblink: String
    }],
  });
  

  
  const Room = module.exports = mongoose.model('Room', rideSchema);
