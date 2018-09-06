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
    router.get('/questions/:questionId', auth.authorize, Questions.getAQuestion);
    router.get('/user/questions', auth.authorize, Questions.getUserQuestions);
};
export default questionRoutes;