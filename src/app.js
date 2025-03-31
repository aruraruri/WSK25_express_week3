import express from 'express';
import api from './api/index.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.send('Welcome to my REST API!');
});

// god save the cats
app.get('/', (req, res) => {
  res.send('Weclome to RetS ApI :--))');
});

app.use('/public', express.static('public'));

app.use('/api/v1', api);

export default app;
