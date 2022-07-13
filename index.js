
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');

require('dotenv').config()
// Use Middleware

app.use(cors());
app.use(express.json());



app.get('/', (req, res) => {
    res.send('Green Garden tools server is running');
})
app.listen(port, (req, res) => {
    console.log('server is running');
})