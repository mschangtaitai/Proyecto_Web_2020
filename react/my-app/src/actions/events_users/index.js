import * as types from '../../types/events_users'
//ADDING USERS

export const startAddingUserEvent = user_event => ({
    type: types.EVENT_USER_ADDED_STARTED,
    payload: {
        user_event
    },
})

export const completeAddingUserEvent = (oldId, user_event) => ({
    type: types.EVENT_USER_ADDED_COMPLETED,
    payload: {
        oldId,
        user_event
    },
})

export const failtAddingUserEvent = (oldId, error) => ({
    type: types.EVENT_USER_ADDED_FAILED,
    payload: {
        oldId,
        error
    }
})


//REMOVING USERS
export const startRemovingUserEvent = user_event => ({
    type: types.EVENT_USER_ADDED_STARTED,
    payload: {
        user_event
    },
})

export const completeRemovingUserEvent = (oldId, event) => ({
    type: types.EVENT_USER_ADDED_COMPLETED,
    payload: {
        oldId,
        event
    },
})

export const failtRemovingUserEvent = (oldId, error) => ({
    type: types.EVENT_USER_ADDED_FAILED,
    payload: {
        oldId,
        error
    }
})

//FETCHING USERS
export const startFetchingUsersEvents = () => ({
    type: types.EVENTS_USERS_FETCH_STARTED,
  });

export const completeFetchingUsersEvents = (entities, order) => ({
    type: types.EVENTS_USERS_FETCH_COMPLETED,
    payload: {
        entities,
        order,
    },
});
export const failFetchingUsersEvent = error => ({
    type: types.EVENTS_USERS_FETCH_FAILED,
    payload: {
        error,
    },
});