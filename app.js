const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const config = require('config');
const cors = require('cors');

const PORT = config.get('port') || 5000;

const app = express();

app.use(cors());
app.options('*', cors());

app.use(express.json({ extended: true }));

app.use(function(req, res, next) {
    let oneof = false;
    if(req.headers.origin) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        oneof = true;
    }
    if(req.headers['access-control-request-method']) {
        res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
        oneof = true;
    }
    if(req.headers['access-control-request-headers']) {
        res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
        oneof = true;
    }
    if(oneof) {
        res.header('Access-Control-Max-Age', 60 * 60 * 24 * 365);
    }
    if (oneof && req.method == 'OPTIONS') {
        res.send(200);
    }
    else {
        next();
    }
});

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/favorite', require('./routes/favorite.routes'));

if(process.env["NODE_ENV"] !== 'production') {
    app.use('/', express.static(path.join(__dirname, './dist')));
    app.get('*', function(_request, response) {
        response.sendFile(path.resolve(__dirname, './dist/index.html'));
    });
}

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        app.listen(PORT, () => {
            console.log(`App has been start on port ${PORT}!`);
        })
    } catch (e) {
        console.log('Server Error', e.message);
        process.exit(1);
    }
}

start();

