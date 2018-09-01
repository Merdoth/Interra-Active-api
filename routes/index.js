// import controllers
import usersRoutes from './userRoutes';
import questionRoutes from './questionRoutes';

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
};

export default routes;
