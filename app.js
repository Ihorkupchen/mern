const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();
app.use(express.json({extended: true}));



app.use('/api/auth', require('./routes/authRouter'));
app.use('/api/link', require('./routes/linkRouter'));

const PORT = config.get ('port') || 5000;
async function  start () {
    try {
        await mongoose.connect(config.get('mongoURI'),{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }).then(() => console.log('MongoDB connected...'))
            .catch(err => console.log(err));
        app.listen(PORT, () => {
            console.log(`App has been started on port ${PORT}...`)
        })
    } catch (e) {
        console.log('Server error', e.message);
        process.exit(1);

    }
}

start();

