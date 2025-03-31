import express from 'express';
const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to my REST API!');
});

// god save the cats
const cats = [];
app.get('/api/v1/cat/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  res.json(cats[id]);
});

app.use('/public', express.static('public'));

// make new cat
function makeCat(id) {
  return {
    cat_id: id,
    name: 'Pulla',
    birthdate: '2018-11-05',
    weight: 5.0,
    owner: 'Pertsa',
    image: 'https://placecats.com/300/200',
  };
}

// create some cats
for (let i = 0; i < 100; i++) {
  cats.push(makeCat(i));
}

export default app;
