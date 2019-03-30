import { ADD_USER, DELETE_USER } from './constants/actionNames';

 function addUser(user) {
    return {
      type: ADD_USER,
      user
    }
  }

 function deleteUser(user) {
    return {
      type: DELETE_USER,
      user
    }
  }

  export { deleteUser, addUser };