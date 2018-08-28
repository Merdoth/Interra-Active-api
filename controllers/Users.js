import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import models from '../models';
import generateToken from '../utils/token';


// create reference to db model
const User = models.users;
// const Answers = models.answers;
// const Questions = models.questions;


/**
 * @class
 */
class Users {
    /**
     * @description creates a new user controller
     *
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     *
     * @returns {Object} json - payload
     */
    static signUpUser(req, res) {
      User.create(req.body)
      .then((userCreated) => {
        const newUser = userCreated.dataValues;
          const token = generateToken(newUser);
          return res.status(201).send({
            message: 'User successfully created!',
            user: {
              fullName: newUser.fullName,
              userName: newUser.userName,
              email: newUser.email,
              token
            }
          });
        })
        .catch(err => res.status(400).send({ err }));
    }
  
    // /**
    //  * @description get a user controller
    //  *
    //  * @param {Object} req - Request object
    //  * @param {Object} res - Response object
    //  *
    //  * @returns {Object} json - payload
    //  */
    // static getUserProfile(req, res) {
    //   Users.findById(req.decoded.id, {
    //     include: [{ model: Questions.count && Questions }, {model: Answers.count && Answers}],
    //     attributes: ['fullName', 'userName', 'email']
    //   })
    //     .then((user) => {
    //       if (!user) {
    //         return res.status(404).send({
    //           message: 'This user does not exist.',
    //         });
    //       }
    //       res.status(200).send({ 
    //           message: 'Found you',
    //           user 
    //       });
    //     })
    //     .catch((err) => {
    //       res.status(500).send({ error: err });
    //     });
    // }
  
    /**
     * @description sign in user controller
     *
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     *
     * @returns {Object} json - payload
     */
    static signInUser(req, res) {
      const { email, password } = req.body;
      User.findOne({
        where: {
            email
          }
      })
        .then((user) => {
          if (user) {
            if (bcrypt.compareSync(password, user.password)) {
              const token = jwt.sign(
                {
                  id: user.id,
                  email: user.email
                },
                process.env.SECRET_KEY,
                {
                  expiresIn: 60 * 60 * 24 // Token expires in 24 hours
                }
              );
              return res.status(200).send({
                message: 'Welcome! successfully signed in.',
                token
              });
            } else if(user.email === req.body.email){
              return res.status(400)
                .send({ message: 'Incorrect email!' });
            }
            else {
                return res.status(400)
                  .send({ message: 'Incorrect login details!' });
              }
          }
          return res.status(404).send({ message: 'User does not exist!' });
        })
        .catch((err) => {
          res.status(500).send({ error: err });
        });
    }
  }
  
  export default Users;
  