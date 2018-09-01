import Questions from '../controllers/Questions';
import auth from '../middleware/authorization';


/**
 * @description question routes
 *
 * @param { Function } router
 *
 * @returns { undefined }
 */
const questionRoutes = (router) => {
    router.post('/questions/add', auth.authorize, Questions.addQuestion);
    router.get('/questions', auth.authorize, Questions.getAllQuestions);
};
export default questionRoutes;