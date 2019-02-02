const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.send("Welcome to our API");
});

router.post('/')

router.get('/:roomId/queue', async (req, res) => {
    let roomID = req.params.id;
    
});

module.exports = router;