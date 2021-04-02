const app = require('express')();

const PORT = process.env.PORT || 6767;

app.get('/', async (req, res) => {
  res.send({ message: 'test test' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
