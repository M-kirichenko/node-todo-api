const express = require('express');
const app = express();
const cors = require("cors");
const port = 3000;
const routes = require("./routes");
const db = require("./models");


app.use(cors());
app.use(express.json());

require('./routes')(app);


db.sequelize.sync({force: true});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
