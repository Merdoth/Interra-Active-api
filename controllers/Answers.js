import models from '../models';
import pagination, { paginates } from '../utils/pagination';

// create reference database model
const Answer = models.answer;


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
}

export default Answers;