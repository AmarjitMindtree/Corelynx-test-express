const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const dotEnv = require('dotenv');
const routes = require('./routes/routes');

const PORT = process.env.PORT || 3000;

// to load env variables
dotEnv.config()

// just to parse JSON request bodies
app.use(bodyParser.json());


app.get('/health', (req, res) => res.send('Service is running.'));

app.use(...routes);
// routes.forEach(route => app.use(route));

app.use('/', (req, res) => { res.status(404).json({ message: `Path not found.`, path: req.originalUrl }) });

app.listen(PORT, () => {
    console.log(`API STARTED AND RUNNING ON PORT ${PORT}`);
});
