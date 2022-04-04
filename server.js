const express = require('express');
const mongooseConnect = require('./database');
require('dotenv').config();
const app = express();

mongooseConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/entries', require('./routes/entry'));
app.use('/api/auth', require('./routes/auth'));
const port = process.env.PORT || 4001;
app.listen(port, () => console.log(`listening on port: ${port}`));
