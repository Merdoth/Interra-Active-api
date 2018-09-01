import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: 'Fullname cannot be Empty!'
        }
      }
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: 'Username cannot be Empty!'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Invalid email format. Try using a format like hello@gmail.com'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8],
          msg: 'Password cannot be less than 8 characters'
        }
      }
    }
  });

  User.associate = (models) => {
    User.hasMany(models.question, {
      foreignKey: 'userId'
    });
    User.hasMany(models.answer, {
      foreignKey: 'userId'
    });
    User.hasMany(models.vote, {
      foreignKey: 'userId'
    });
    User.hasMany(models.comment, {
      foreignKey: 'userId'
    });
  };

  User.beforeCreate((user) => {
    user.dataValues.password = bcrypt.hashSync(
      user.dataValues.password,
      bcrypt.genSaltSync(10)
    );
    user.dataValues.email = user.dataValues.email;
    user.dataValues.userName = user.dataValues.userName;
    user.dataValues.fullName = user.dataValues.fullName;
  });

  User.beforeUpdate((user) => {
    if (user.changed.password) {
      user.dataValues.password = bcrypt.hashSync(
        user.dataValues.password,
        bcrypt.genSaltSync(10)
      );
    }
  });

  return User;
};
