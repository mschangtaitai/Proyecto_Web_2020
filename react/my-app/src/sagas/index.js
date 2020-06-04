import { fork, all } from 'redux-saga/effects';

import {
  watchLoginStarted,
  watchRefreshTokenStarted,
} from './auth/index';

import {
    watchEventFetch,
    watchaddEvent,
    watchRemoveEvent
} from './events/index'

import {
  watchTutorFetch,
  watchAddTutor,
  watchRemoveTutor
} from './tutors/index'



function* rootSaga() {
  yield all([
    fork(watchLoginStarted),
    fork(watchRefreshTokenStarted),
    fork(watchEventFetch),
    fork(watchaddEvent),
    fork(watchRemoveEvent),
    fork(watchTutorFetch),
    fork(watchAddTutor),
    fork(watchRemoveTutor),
  ]);
}

export default rootSaga;
