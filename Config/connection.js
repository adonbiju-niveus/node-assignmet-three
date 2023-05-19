const mongoose = require('mongoose');
const logger = require('../Logger/logger');
require('dotenv').config();
const mongoUrl = process.env.MONGO_URL

mongoose.set('strictQuery', false);
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
.then(()=>{
    logger.info('Database Connection Successful')
}).catch((err)=>{
    console.log(err);
    logger.error(`Database Connection Error ${err}`)
});