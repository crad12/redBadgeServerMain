const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres'  
});

sequelize.authenticate()
.then(() => console.log('Connected to redBadgeServer postgres database'))
.catch(err => console.log(err));

//Database Associations//

const User = sequelize.import('./models/user');
const Coffee = sequelize.import('./models/coffee');
const Comment = sequelize.import('./models/comment');


User.hasMany(Coffee);
Coffee.belongsTo(User);
Coffee.hasMany(Comment);
Comment.belongsTo(Coffee);

module.exports = sequelize;
// let User = require('./models/User')(sequelize, Sequelize);
// let Coffee = require('./models/Coffee')(sequelize, Sequelize);
// let Comment = require('./models/Comment')(sequelize, Sequelize);
// User.hasMany(Coffee);
// Coffee.belongsTo(User);