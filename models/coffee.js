module.exports = (sequelize, DataTypes) => {
    const Coffee = sequelize.define('coffee', {
        name: {
        type: DataTypes.STRING,
        allowNull: false
        }, 
        location: {
        type: DataTypes.STRING,
        allowNull: false
        }, 
        favoriteDrink: {
        type: DataTypes.STRING,
        allowNull: false
        },
        note: {
        type: DataTypes.STRING,
        allowNull: false
        },
        owner: {
        type: DataTypes.STRING,
        allowNull: false,
        },
    })
    
    return Coffee;
    }