require('./Config/connection');
const express = require('express');
const logger = require('./Logger/logger');
const routes = require('./Routes/userRoutes');

require('dotenv').config();
const port = process.env.PORT || 8000;
const app = express();

app.use(express.json());

//app.get('/', (req, res) => res.send('Hello world!'))
app.use('/api',routes);

app.listen(port,()=>{
    logger.info(`Listening to Port ${port}`)
})

module.exports = app;