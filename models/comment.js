module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('comment', {
        name: {
        type: DataTypes.STRING,
        allowNull: true
        }, 
        comment: {
        type: DataTypes.STRING,
        allowNull: true
        }, 
        rating: {
        type: DataTypes.STRING,
        allowNull: true
        },
        owner: {
        type: DataTypes.INTEGER,
        allowNull: false,
        }
    })
    
    return Comment;
    }