module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('comment', {
        name: {
        type: DataTypes.STRING,
        allowNull: true
        }, 
        comment: {
        type: DataTypes.STRING,
        allowNull: false
        }, 
        rating: {
        type: DataTypes.STRING,
        allowNull: false
        },
        owner: {
        type: DataTypes.INTEGER,
        allowNull: false,
        }
    })
    
    return Comment;
    }