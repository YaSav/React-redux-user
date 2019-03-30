import { createStore } from 'redux';
import usersReducer from './reducers/userReducer';

import users from './mocks/users';

const defaultState = {
  users,
};
const store = createStore(usersReducer, defaultState);

export default store;