module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define('comment', {
      userId: {
        type: DataTypes.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'id',
          as: 'userId'
        }
      },
      answerId: {
        type: DataTypes.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'answers',
          key: 'id',
          as: 'answerId'
        }
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: false
      },
    });
  
    Comments.associate = (models) => {
        Comments.belongsTo(models.user, {
        foreignKey: 'userId'
      });
      Comments.belongsTo(models.answer, {
        foreignKey: 'answerId'
      });
    };
    return Comments;
  };
  