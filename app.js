'use strict';
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();


app.use(morgan('common'));
app.use(cors());
const modules = require('./module.js');

app.get('/apps', (req, res) => {
  const { genres, sort, search = '' } = req.query;

  if (sort) {
    if (![ 'rateing','apps'].includes(sort)) {
      return res
        .status(400)
        .send('sort must be one of title or rank');
    }
  }
  let results = modules.filter(obj => obj.App.toLowerCase().includes(search.toLowerCase()));
  if (sort === 'app') {
    results.sort((a, b) => {
      return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
    });
  }

  if (genres) {
    if (!['action', 'puzzle', 'strategy', 'casual', 'arcade', 'card'].includes(genres.toLowerCase())) {
      return res.status(400).send('Genre must be one of Action, Puzzle, Strategy, Casual, Arcade or Card');
    }
    results = results.filter(app => {
      return app.Genres.toLowerCase() === genres.toLowerCase();
    });
  }


  return res.send(results);

});
app.listen(8000, () => {
  console.log('server started on port 8000');
});   

