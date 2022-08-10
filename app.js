const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 4000;

require('./routes/Route')(app);

app.listen(port, () => {
	console.log('SERVER: listening on localhost:'+port);
})