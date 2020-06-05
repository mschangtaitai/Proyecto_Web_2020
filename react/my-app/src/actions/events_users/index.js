//ADDING USERS

export const startAddingUserEvent = event => ({
    type: types.EVENT_USERS_ADDED_STARTED,
    payload: {
        userid
    },
})

export const completeAddingUserEvent = (oldId, event) => ({
    type: types.EVENT_USERS_ADDED_COMPLETED,
    payload: {
        oldId,
        event
    },
})

export const failtAddingUserEvent = (oldId, error) => ({
    type: types.EVENT_USERS_ADDED_FAILED,
    payload: {
        oldId,
        error
    }
})


//REMOVING USERS
export const startRemovingUserEvent = event => ({
    type: types.EVENT_USERS_ADDED_STARTED,
    payload: {
        userid
    },
})

export const completeRemovingUserEvent = (oldId, event) => ({
    type: types.EVENT_USERS_ADDED_COMPLETED,
    payload: {
        oldId,
        event
    },
})

export const failtRemovingUserEvent = (oldId, error) => ({
    type: types.EVENT_USERS_ADDED_FAILED,
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