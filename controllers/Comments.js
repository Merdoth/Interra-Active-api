import models from '../models';


const Comment = models.comment

class Comments {

    static addComment(req, res) {
      const{ comment } = req.body;
      const{ answerId } = req.params;
    Comment.create({
        userId: req.decoded.id,
        answerId,
        comment
    })
    .then(createdComment =>
        res
          .status(200)
          .send({ 
            message: 'Your comment has been successfully added!',
            createdComment 
          }))
      .catch(error => res.status(500).send({ error }));
  }

}

export default Comments;