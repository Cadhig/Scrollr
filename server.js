const express = require('express');
const session = require('express-session');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3002;

const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection');
const { Session } = require('./models');

const hour = 3600000
app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: 'auto',
        expires: new Date(Date.now() + hour)
    },
    store: new SequelizeStore({
        db: sequelize,
        model: Session
    }),
}))


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


const controllers = require('./controllers');
app.use(controllers);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () =>
        console.log(`Server running on port ${PORT}. Visit http://localhost:${PORT} and create an account!`)
    );
});