import Question from '../controllers/Question';

/**
 * @description question routes
 *
 * @param { Function } router
 *
 * @returns { undefined }
 */
const questionRoutes = (router) => {
    router.post('/questions', Question.addQuestion);
    router.get('/questions', Question.getAllQuestions);
}
export default questionRoutes;