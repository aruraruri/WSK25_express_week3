import express from 'express';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Welcome to my REST API!');
});

// god save the cats
const cats = [];
app.get('/api/v1/cat/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  res.send(cats[id]);
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// make new cat
function makeCat(id) {
  return {
    cat_id: id,
    name: 'Pulla',
    birthdate: '24.10.2018',
    weight: 5.0,
    owner: 'Pertsa',
    image: 'https://placecats.com/300/200',
  };
}

// create some cats
for (let i = 0; i < 100; i++) {
  cats.push(makeCat(i));
}
