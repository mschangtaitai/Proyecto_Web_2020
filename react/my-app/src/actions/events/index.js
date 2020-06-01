import * as types from '../../types/events'

//ADDING

export const startAddingEvent = event => ({
    type: types.EVENT_ADDED_STARTED,
    payload: {
        event
    },
})

export const completeAddingEvent = (oldId, event) => ({
    type: types.EVENT_ADDED_STARTED,
    payload: {
        oldId,
        event
    },
})

export const failAddingEvent = (oldId, error) => ({
    type: types.EVENT_ADDED_FAILED,
    payload: {
        oldId,
        error
    }
})

//REMOVING
export const startRemovingEvent = id => ({
    type: types.EVENT_REMOVED_STARTED,
    payload: {
      id,
    },
  });

export const completeRemovingEvent = () => ({
    type: types.EVENT_REMOVED_COMPLETED,
});

export const failRemovingEvent = (id, error) => ({
    type: types.EVENT_REMOVED_FAILED,
    payload: {
        id,
        error,
    },
});

//FETCHING
export const startFetchingEvents = () => ({
    type: types.EVENTS_FETCH_STARTED,
  });
export const completeFetchingEvent = (entities, order) => ({
    type: types.EVENTS_FETCH_COMPLETED,
    payload: {
        entities,
        order,
    },
});
export const failFetchingEvent = error => ({
    type: types.EVENTS_FETCH_FAILED,
    payload: {
        error,
    },
});