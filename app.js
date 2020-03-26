const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const config = require('config');
const cors = require('cors');
const { expressCspHeader, INLINE, NONE, SELF } = require('express-csp-header');

const PORT = config.get('port') || 5000;

const app = express();

app.use(cors());
app.options('*', cors());

app.use(express.json({ extended: true }));

/*
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Content-Security-Policy", "default-src SELF, https://fonts.googleapis.com, https://pokeapi.co, https://raw.githubusercontent.com");
    res.header("X-Content-Security-Policy", "default-src *");
    res.header("X-WebKit-CSP", "default-src *");
    res.header(
        "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});*/

app.use(expressCspHeader({
    directives: {
        'default-src': [SELF, 'https://fonts.googleapis.com', 'https://pokeapi.co', 'https://raw.githubusercontent.com'],
        'script-src': [SELF, 'https://pokeapi.co'],
        'img-src': [SELF, 'https://raw.githubusercontent.com'],
        'style-src': [SELF],
        'font-src': [SELF, 'https://fonts.googleapis.com'],
        'connect-src': [SELF, 'https://pokeapi.co', 'https://raw.githubusercontent.com'],
        'form-action': [SELF],
        'block-all-mixed-content': true
    }
}));




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

