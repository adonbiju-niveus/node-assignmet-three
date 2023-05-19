require('./Config/connection');
const express = require('express');
const logger = require('./Logger/logger');

require('dotenv').config();
const port = process.env.PORT || 8000;
const app = express();

app.use(express.json());

//app.get('/', (req, res) => res.send('Hello world!'))

app.listen(port,()=>{
    logger.info(`Listening to Port ${port}`)
})

module.exports = app;