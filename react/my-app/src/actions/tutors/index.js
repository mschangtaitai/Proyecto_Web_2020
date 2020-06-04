import * as types from '../../types/tutors'

//ADDING
export const startAddingTutor = tutor => ({
  type: types.TUTOR_ADDED_STARTED,
  payload: {
      tutor
  },
})

export const completeAddingTutor = (oldId, tutor) => ({
  type: types.TUTOR_ADDED_COMPLETED,
  payload: {
      oldId,
      tutor
  },
})

export const failAddingTutor = (oldId, error) => ({
  type: types.TUTOR_ADDED_FAILED,
  payload: {
      oldId,
      error
  }
})

//REMOVING
export const startRemovingTutor = id => ({
  type: types.TUTOR_REMOVED_STARTED,
  payload: {
    id,
  },
});

export const completeRemovingTutor = () => ({
  type: types.TUTOR_REMOVED_COMPLETED,
});

export const failRemovingTutor = (id, error) => ({
  type: types.TUTOR_REMOVED_FAILED,
  payload: {
      id,
      error,
  },
});

//FETCHING
export const startFetchingTutors = () => ({
  type: types.TUTORS_FETCH_STARTED,
  payload: {
    // course
  }
});
export const completeFetchingTutors = (entities, order) => ({
  type: types.TUTORS_FETCH_COMPLETED,
  payload: {
      entities,
      order,
  },
});
export const failFetchingTutors = error => ({
  type: types.TUTORS_FETCH_FAILED,
  payload: {
      error,
  },
});