module.exports = (sequelize, DataTypes) => {
    const Answer = sequelize.define('answer', {
      userId: {
        type: DataTypes.INTEGER,
        // onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'id',
          as: 'userId'
        }
      },
      questionId: {
        type: DataTypes.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'questions',
          key: 'id',
          as: 'questionId'
        }
      },
      answer: {
        type: DataTypes.STRING,
        allowNull: false
      },
      upVotes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
      },
      downVotes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
      },
    });
  
    Answer.associate = (models) => {
      Answer.belongsTo(models.user, {
        foreignKey: 'userId'
      });
      Answer.belongsTo(models.question, {
        foreignKey: 'questionId'
      });
      Answer.hasMany(models.vote, {
        foreignKey: 'answerId'
      });
      Answer.hasMany(models.comment, {
        foreignKey: 'answerId'
      });
    };
    return Answer;
  };
  