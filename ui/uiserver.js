const express = require('express');
const app = express();

require('dotenv').config();
const port = process.env.UI_SERVER_PORT || 4000;

const UI_API_ENDPOINT = process.env. UI_API_ENDPOINT || 'http://localhost:3000/graphql';
const env = { UI_API_ENDPOINT };

app.get('/env.js', (req, res) => {
    res.send(`window.ENV = ${JSON.stringify(env)}`);
});


app.use(express.static('public'));
app.listen(port, () => {
    console.log(`UI server started on port ${port}`);
});