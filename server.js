'use strict';

const express = require('express');
const firebase = require('./lib/firebase')();
const logger = require('./lib/logger');

const app = express();


//const a = process.env.FFF;

//const private_key = a.replace(/\\n/g, '\n');
//console.log(private_key);



app.get('/', (req, res) => {
  res.send(200);
});

app.get('/users/:id', (req, res) => {
  logger.info('/users/:id');
  logger.info('/parameters', req.params);

  let id = req.params.id;

  if (!id) {
    logger.warn('not found');
    return res.send(404);
  }

  let user = null;

  logger.info('connect firebase');

  try {
    user = firebase.database().ref(`users/${id}`);
  } catch (error) {
    logger.error(error);
    return res.send(500, {
      message: error.message
    });
  }

  logger.info('update firebase');

  //
  user.set({
    name: 'a'
  }).then(() => {
    res.json({ ok: true });
  }).catch((error) => {
    logger.error(error);
    res.send(500, {
      message: error.message
    });
  });

});

const port = (process.env.NODE_ENV === 'production') ? 80 : 3000;
app.listen(port);
