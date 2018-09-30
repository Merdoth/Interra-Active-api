import models from '../models';
import pagination, { paginates } from '../utils/pagination';

// create reference database model
const Answer = models.answer;
const Comments = models.comment;

let query = {};


class Answers {
     /**
     * @description add answer controller
     *
     * @param { Object } req - Request object
     * @param { Object } res - Response object
     *
     * @returns { Object } json - payload
     */

     static addAnswer(req, res) {
      const { answer, upVotes, downVotes } = req.body;
      const { questionId } = req.params;
      const { id } = req.decoded

      Answer.create({
          userId: id,
          questionId,
          answer,
          upVotes,
          downVotes
      })
      .then((createdAnswer) => {
       return res.status(200).send({
           message: "Answer added successfully",
           createdAnswer
       })
      })
      .catch(error => res.status(500).send({ error: error.message }));
     }

     /**
     * @description get all answers controller
     *
     * @param { Object } req - Request object
     * @param { Object } res - Response object
     *
     * @returns { Object } json - payload
     */

    static getAllAnswers(req, res) {

    let { limit, offset, page } = req.query;
    page = page || 1;
    limit = limit || 6;
    offset = limit * (page - 1) || 0;
      query = {
        include: [{ model: Comments }],
        order: [['createdAt', 'DESC']],
        offset,
        limit: 10
      };
      Answer
      .findAndCountAll(query)
      .then((answersFound) => {
        if (answersFound.length < 1) {
          return res.status(404).send({
            message: 'No answers found. Please try to ask one.'
          });
        }
        query.offset = req.query.offset || 0;
        query.limit = req.query.limit || 10;
        const paginate = pagination(
          query.limit,
          query.offset,
          answersFound.count
        );
        if (answersFound) {
          return res.status(200).send({
            messsage: 'Answers successfully found.',
            paginate,
            answersFound
          });
        }
        return res.status(404).send({ message: 'Answers not found' });
      })
      .catch(error => res.status(500).send({ error }));
        

    }
}

export default Answers;