// import controllers
import usersRoutes from './userRoutes';
import questionRoutes from './questionRoutes';
import answerRoutes from './answerRoutes';
import commentRoutes from './commentRoutes';

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
  commentRoutes(router);
};

export default routes;
