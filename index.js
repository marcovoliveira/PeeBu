const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

app.use(morgan('tiny'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({
        message: 'PeeBu!'
    });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});