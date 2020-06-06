import { fork, all } from 'redux-saga/effects';

import {
  watchLoginStarted,
  watchRefreshTokenStarted,
  watchGroupFetch
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

import {
  watchUserFetch,
  watchAddUser,
  watchRemoveUser
} from './user/index'

import {
  watchEventUserFetch,
  watchAddUserEvent,
  watchRemoveUserEvent
} from './events_users/index'

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
    fork(watchUserFetch),
    fork(watchAddUser),
    fork(watchRemoveUser),
    fork(watchGroupFetch),
    fork(watchEventUserFetch),
    fork(watchAddUserEvent),
    fork(watchRemoveUserEvent)   
  ]);
}

export default rootSaga;
