const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.ATLAS_URI + 'urlreactDB', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => console.log('Connected to MongoDB server'));

const urlsRouter = require('./routes/urls');
const usersRouter = require('./routes/users');
const shortUrlsRouter = require('./routes/shortUrls');

app.use('/urls', urlsRouter);
app.use('/users', usersRouter);
app.use('/', shortUrlsRouter);

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})