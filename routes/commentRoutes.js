import Comments from '../controllers/Comments';
import auth from '../middleware/authorization';


/**
 * @description question routes
 *
 * @param { Function } router
 *
 * @returns { undefined }
 */
const commentRoutes = (router) => {
    router.post('/answers/comment/:answerId', auth.authorize, Comments.addComment);
};
export default commentRoutes;