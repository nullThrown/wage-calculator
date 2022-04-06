const express = require('express');
const mongooseConnect = require('./database');
require('dotenv').config();
const app = express();

mongooseConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/entries', require('./routes/entry'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/account', require('./routes/account'));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`listening on port: ${port}`));
