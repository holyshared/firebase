const express = require('express');
const firebase = require('./lib/firebase')();

const app = express();

app.get('/users/:id', (req, res) => {

  const id = req.param('id', null);

  if (!id) {
    return res.send(404);
  }

  const user = firebase.database().ref(`/users/${id}`);

  user.set({
    name: 'a'
  }).then(() => {
    res.json({ ok: true });
  }).catch((error) => {
    res.send(500, {
      message: error.message
    });
  });

});
app.listen(3000);
