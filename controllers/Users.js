import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import models from '../models';
import generateToken from '../utils/token';


// create reference to db model
const User = models.user;
const Answer = models.answer;
const Question = models.question;


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
  
    /**
     * @description get a user controller
     *
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     *
     * @returns {Object} json - payload
     */
    static getUserProfile(req, res) {
      User.findById(req.decoded.id, {
        include: [{ model: Question.count && Question }, {model: Answer.count && Answer}],
        attributes: ['fullName', 'userName', 'email']
      })
        .then((user) => {
          if (!user) {
            return res.status(404).send({
              message: 'This user does not exist.',
            });
          }
          res.status(200).send({ 
              message: 'Found you',
              user 
          });
        })
        .catch((err) => {
          res.status(500).send({ error: err });
        });
    }
  
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
      if(!email && !password){
        return res.status(400).send({ message: 'Olodo how do you want to submit an empty form'})
      }
      if(email.trim() != '' && password.trim() != '') {
        User.findOne({
          where: {
            email
          }
        })
        .then((userFound) => {
          if(!userFound){
            return res.status(404).send({
              message: 'User not found!'
            })
          }
          if(bcrypt.compareSync(password, userFound.password)){
            const token = jwt.sign(
              {
                id: userFound.id,
                email: userFound.email
              },
              process.env.SECRET_KEY, 
              {
                expiresIn: '24h'
              }
            )
            return res.status(200).send({ 
            message: 'User successfully found!',
            token
          })
        }
        })
        .catch(err => {res.status(500).send({error: err})})
    }else {
      return res.status(400).send({message: 'fields cannot be empty!!'})
    }
   }
  }
  
  export default Users;
  