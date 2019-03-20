require('dotenv').config();
const express = require('express'); 
const app = express(); 
const sequelize = require('./db');
const coffee = require('./controllers/coffeecontroller');
const user = require('./controllers/usercontroller');
const comment = require('./controllers/commentcontroller');
const bodyParser = require('body-parser');

sequelize.sync({force:true});

app.use(bodyParser.json());
app.use(require('./middleware/headers'));
app.use(require('./middleware/validate-session'))
app.use(express.static(__dirname + '/public'))
app.get('/', (req, res) => res.render('index'));

app.use('/coffee', coffee);
app.use('/user', user);
app.use('/', comment);

app.listen(process.env.PORT, () => console.log(`App is listening on ${process.env.PORT}`));