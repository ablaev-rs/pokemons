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

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use(expressCspHeader({
    directives: {
        'default-src': [SELF, INLINE, 'fonts.googleapis.com', 'pokeapi.co', 'raw.githubusercontent.com'],
        'script-src': [SELF, INLINE],
        'img-src': ['data:', 'raw.githubusercontent.com', 'ablaev.pro'],
        'style-src': [SELF, INLINE, 'fonts.googleapis.com'],
        'font-src': [SELF, INLINE, 'fonts.googleapis.com'],
        'block-all-mixed-content': false
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

