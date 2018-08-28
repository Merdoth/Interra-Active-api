import Users from '../controllers/Users';
// import auth from '../middleware/authorization';
// import checkUserExists from '../middleware/checkUserExists';

/**
 * @description user routes
 *
 * @param { Function } router
 *
 * @returns { undefined }
 */
const userRoutes = (router) => {
  // router.get('/user', auth.authorize, User.getUserProfile);
  router.post('/users/signup', Users.signUpUser
  );
  router.post('/users/signin', Users.signInUser);
};

export default userRoutes;
