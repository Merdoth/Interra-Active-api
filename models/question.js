module.exports = (sequelize, DataTypes) => {
    const Question = sequelize.define('question', {
      userId: {
        type: DataTypes.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'id',
          as: 'userId'
        }
      },
      question: {
        type: DataTypes.STRING,
        allowNull: false
      },
    });
  
    Question.associate = (models) => {
      Question.belongsTo(models.user, {
        foreignKey: 'userId'
      });
      Question.hasMany(models.answer, {
        foreignKey: 'questionId'
      });
    };
    return Question;
  };
  