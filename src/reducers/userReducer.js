import { combineReducers }  from 'redux';
import { routerReducer } from 'react-router-redux';
import { ADD_USER, DELETE_USER } from '../constants/actionNames';

function users(state = [], action) {
    switch(action.type) {
      case ADD_USER:
        const stateCopy = [...state];
        stateCopy.push(action.user);
        return stateCopy;  

      case DELETE_USER:
        const id = state.indexOf(action.user);
        
        if (id >= 0) {
          return [
            ...state.slice(0, id),
            ...state.slice(id + 1, state.length)
          ];
        }
        return [...state];

      default:
        return state;
    }
  }
  
  const usersReducer = combineReducers({users, routing: routerReducer });

  export default usersReducer; 