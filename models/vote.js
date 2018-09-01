module.exports = (sequelize, DataTypes) => {
    const Vote = sequelize.define('vote', {
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
      voted: {
        type: DataTypes.STRING
      },
    });
    Vote.associate = (models) => {
      Vote.belongsTo(models.answer, {
        foreignKey: 'answerId',
      });
      Vote.belongsTo(models.user, {
        foreignKey: 'userId'
      });
    };
    return Vote;
  };
  