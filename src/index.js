const express = require('express');
const cors = require('cors');
require('dotenv').config();
const routes = require('./route');
const app = express();
app.set('port', 7080);
app.use(express.json())
app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use('/', routes);

app.listen(app.get('port'), () => {
  console.log('Server is on port 7080');
});
