import omit from 'lodash/omit'
import { combineReducers } from 'redux'
import * as types from '../../types/tutors'
import uniqBy from 'lodash/uniqBy'


const byId = (state = {}, action) => {
  switch(action.type) {
    case types.TUTORS_FETCH_COMPLETED: {
      const { entities, order } = action.payload;
      const newState = { ...state };
      order.forEach(id => {
        newState[id] = {
          ...entities[id],
          isConfirmed: true,
        };
      });

      return newState;
    }
    case types.TUTOR_ADDED_STARTED: {
      const newState = { ...state };
      newState[action.payload.id] = {
        ...action.payload,
        isConfirmed: false,
      };
      return newState;
    }
    case types.TUTOR_ADDED_COMPLETED: {
      const { oldId, tutor } = action.payload;
      const newState = omit(state, oldId);
      newState[tutor.id] = {
        ...tutor,
        isConfirmed: true,
      };
      return newState;
    }
    case types.TUTOR_REMOVED_STARTED: {
      return omit(state, action.payload.id);
    }
    default: {
      return state;
    }
  }
};

const order = (state = [], action) => {
  switch(action.type) {
      case types.TUTORS_FETCH_COMPLETED: {
      const newOrder = [...state, ...action.payload.order];
      return uniqBy(newOrder);
      }
      case types.TUTOR_ADDED_STARTED: {
      return [...state, action.payload.id];
      }
      case types.TUTOR_ADDED_COMPLETED: {
      const { oldId, tutor } = action.payload;
      return state.map(id => id === oldId ? tutor.id : id);
      }
      case types.TUTOR_REMOVED_STARTED: {
      return state.filter(id => id !== action.payload.id);
      }
      default: {
      return state;
      }
  }
};

const isFetching = (state = false, action) => {
  switch(action.type) {
    case types.TUTORS_FETCH_STARTED: {
      return true;
    }
    case types.TUTORS_FETCH_COMPLETED: {
      return false;
    }
    case types.TUTORS_FETCH_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const error = (state = null, action) => {
switch(action.type) {
  case types.TUTORS_FETCH_FAILED: {
     return action.payload.error;
  }
  case types.TUTORS_FETCH_STARTED: {
   return null;
  }
  case types.TUTORS_FETCH_COMPLETED: {
      return null;
  }
  default: {
  return state;
  }
}
};

export default combineReducers({
  byId,
  order,
  isFetching,
  error,
});

export const getTutor = (state, id) => state.byId[id];
export const getTutors = state => state.order.map(id => getTutor(state, id));
export const isFetchingTutors = state => state.isFetching;
export const getFetchingTutorsError = state => state.error;