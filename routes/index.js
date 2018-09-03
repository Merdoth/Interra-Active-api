// import controllers
import usersRoutes from './userRoutes';
import questionRoutes from './questionRoutes';
import answerRoutes from './answerRoutes';

/**
 * @description index routes
 *
 * @param { Function } router
 *
 * @returns { undefined }
 */
const routes = (router) => {
  usersRoutes(router);
  questionRoutes(router);
  answerRoutes(router);
};

export default routes;
