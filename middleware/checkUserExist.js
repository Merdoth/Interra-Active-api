// import models from model directory
import models from '../models';

const Users = models.users;

/**
 * @description checks if user exists
 *
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Object} next - callback
 *
 * @returns {object} json - payload
 */
const checkUserExists = (req, res, next) => {
  const { userName, email } = req.body;
  return Users.findOne({
    where: {
      $or: [
        {
          email
        },
        {
          userName
        }
      ]
    }
  })
    .then((user) => {
      if (user.email === req.body.email) {
        return res.status(409).send({
          message: 'User already exists. Try a different email.'
        });
      }
      else if (user.userName === req.body.userName) {
        return res.status(409).send({
            message: 'User already exists. Try a different username.'
          });  
      }
      next();
    })
    .catch((err) => {
      res.status(400).send({ error: err });
    });
};

export default checkUserExists;
