const express = require('express');
const app = express();
const cors = require('cors')
const message = require('./routes/ messgae')

app.use(express.json());
app.use(cors());

app.post('/api/message', message )

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));
