const express = require('express');
const uuid4 = require('uuid4');
const sequelize = require('./config/config');
const User = require('./model/User');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/:user', async (req, res) => {
  try {
    const user = await User.create({
      username: req.params.user,
      token: uuid4(),
    });
    res.send(
      `Thank you ${req.params.user}! This is Dali's custom token server!`
    );
  } catch (err) {
    res.send('There was an error 😒');
  }
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});
