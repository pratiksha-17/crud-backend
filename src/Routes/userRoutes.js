const UserController = require('../Controllers/userController');

exports.getRouter = (app) => {

    app.post('/user/saveUserData', UserController.createUser );  

    app.get('/user/get_user', UserController.get_user );  
 
    app.put('/user/delete_user', UserController.delete_user ); 
    
    app.post('/user/editUserDetails', UserController.editUserDetails ); 
 
  return app;
  
 }