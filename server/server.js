const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

let app = express();

app.get('/', async (req, res) => {
    res.send('Hello World')
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})