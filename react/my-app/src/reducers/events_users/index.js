import omit from 'lodash/omit'
import { combineReducers } from 'redux'
import * as types from '../../types/events_users'

const byId = (state = {}, action) => {
  switch(action.type) {
    case types.EVENTS_USERS_FETCH_COMPLETED: {
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
    case types.EVENT_USER_ADDED_STARTED: {
      const newState = { ...state };
      newState[action.payload.id] = {
        ...action.payload,
        isConfirmed: false,
      };
      return newState;
    }
    case types.EVENT_USER_ADDED_COMPLETED: {
      const { oldId, event_user } = action.payload;
      const newState = omit(state, oldId);
      newState[event_user.id] = {
        ...event_user,
        isConfirmed: true,
      };
      return newState;
    }
    case types.EVENT_USER_REMOVED_STARTED: {
      return omit(state, action.payload.id);
    }
    default: {
      return state;
    }
  }
};

const order = (state = [], action) => {
  switch(action.type) {
      case types.EVENTS_USERS_FETCH_COMPLETED: {
      return [...state, ...action.payload.order];
      }
      case types.EVENT_USER_ADDED_STARTED: {
      return [...state, action.payload.id];
      }
      case types.EVENT_USER_ADDED_COMPLETED: {
      const { oldId, event_user } = action.payload;
      return state.map(id => id === oldId ? event_user.id : id);
      }
      case types.EVENT_USER_REMOVED_STARTED: {
      return state.filter(id => id !== action.payload.id);
      }
      default: {
      return state;
      }
  }
};

const isFetching = (state = false, action) => {
  switch(action.type) {
    case types.EVENTS_USERS_FETCH_STARTED: {
      return true;
    }
    case types.EVENTS_USERS_FETCH_COMPLETED: {
      return false;
    }
    case types.EVENTS_USERS_FETCH_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const error = (state = null, action) => {
switch(action.type) {
  case types.EVENTS_USERS_FETCH_FAILED: {
     return action.payload.error;
  }
  case types.EVENTS_USERS_FETCH_STARTED: {
   return null;
  }
  case types.EVENTS_USERS_FETCH_COMPLETED: {
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

export const getEventUser = (state, id) => state.byId[id];
export const getEventsUsers = state => state.order.map(id => getEventUser(state, id));
export const isFetchingEventsUsers = state => state.isFetching;
export const getFetchingEventsUsersError = state => state.error;
export const getUsersOfEvent = (state, event_id) => getEventsUsers(state).filter( event_user => event_user.event_id == event_id)