import * as types from '../../types/users'

//ADDING
export const startAddingUser = user => ({
  type: types.USER_ADDED_STARTED,
  payload: {
      user
  },
})

export const completeAddingUser = (oldId, user) => ({
  type: types.USER_ADDED_COMPLETED,
  payload: {
      oldId,
      user
  },
})

export const failAddingUser = (oldId, error) => ({
  type: types.USER_ADDED_FAILED,
  payload: {
      oldId,
      error
  }
})

//REMOVING
export const startRemovingUser = id => ({
  type: types.USER_REMOVED_STARTED,
  payload: {
    id,
  },
});

export const completeRemovingUser = () => ({
  type: types.USER_REMOVED_COMPLETED,
});

export const failRemovingUser = (id, error) => ({
  type: types.USER_REMOVED_FAILED,
  payload: {
      id,
      error,
  },
});

//FETCHING
export const startFetchingUsers = () => ({
  type: types.USERS_FETCH_STARTED,
});
export const completeFetchingUsers = (entities, order) => ({
  type: types.USERS_FETCH_COMPLETED,
  payload: {
      entities,
      order,
  },
});
export const failFetchingUser = error => ({
  type: types.USERS_FETCH_FAILED,
  payload: {
      error,
  },
});