import { fork, all } from 'redux-saga/effects';

import {
  watchLoginStarted,
  watchRefreshTokenStarted,
} from './auth/index';
/*import {
    watchUserFetch
} from './user/index'*/

export default rootSaga;


function* rootSaga() {
  yield all([
    fork(watchLoginStarted),
    fork(watchRefreshTokenStarted),
    //fork(watchUserFetch)
  ]);
}

