import Answers from '../controllers/Answers';
import auth from '../middleware/authorization';


/**
 * @description question routes
 *
 * @param { Function } router
 *
 * @returns { undefined }
 */
const answerRoutes = (router) => {
    router.post('/answers/:questionId', auth.authorize, Answers.addAnswer);
};
export default answerRoutes;