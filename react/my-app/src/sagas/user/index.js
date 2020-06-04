import {
  call,
  takeEvery,
  put,
  delay,
  select,
} from 'redux-saga/effects'
import { normalize } from 'normalizr'
// import * as selectors from '.';
import * as actions from '../../actions/users'
import * as types from '../../types/users'
import * as selectors from '../../reducers'
import * as schemas from '../../schemas/users'

const API_BASE_URL = 'http://127.0.0.1:8000'

function* fetchUsers(action) {
  console.log('Intentando fetchear')
  try {
    const isAuth = yield select(selectors.isAuthenticated);
    if (isAuth) {
      console.log('yep, si estoy autorizado')
      const token = yield select(selectors.getAuthToken);
      const response = yield call(
        fetch,
        `${API_BASE_URL}/api/v1/users/`,
        {
          method: 'GET',
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `JWT ${token}`,
          },
        }
      );
      

      if (response.status === 200 || response.status === 201) {
          console.log(response)
          const jsonResult = yield response.json();
        const {
          entities: { users },
          result,
        } = normalize(jsonResult, schemas.users);
      
        yield put(
          actions.completeFetchingUsers(
            users,
            result,
          ),
        );

      } else {
        const { non_field_errors } = yield response.json();
        yield put(actions.failFetchingUsers(Error));
      }
    }
  } catch (error) {
     console.log("ERROR", error)
     yield put(actions.failFetchingUsers(Error));
   
  }
}

export function* watchUserFetch() {
  yield takeEvery(
    types.USERS_FETCH_STARTED,
    fetchUsers,
  );
}

function* addUser(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);

    if (isAuth) {
      const token = yield select(selectors.getAuthToken);
      console.log('estamos en addUser')

      console.log(action.payload.user)
      const response = yield call(
        fetch,
        `${API_BASE_URL}/api/v1/users/`,
        {
          method: 'POST',
          body: JSON.stringify(action.payload.user),
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `JWT ${token}`,
          },
        }
      );
        
      console.log(action.payload)
      if (response.status === 201) {
        const jsonResult = yield response.json();
        console.log(jsonResult)
        yield put(
          actions.completeAddingUser(
            action.payload.id,
            jsonResult,
          ),
        );
        const {
        entities: { users },
        result,
        } = normalize(jsonResult, schemas.users);

        // yield put(
        //   actions.completeAddingUser(
        //     users,
        //     result,
        //   ),
        // );
      } else {
        // const { non_field_errors } = yield response.json();
        // yield put(actions.failAddingUser(non_field_errors[0]));
      }
    }
  } catch (error) {
    yield put(actions.failAddingUser(error));
    console.log("ERROR", error)
  }
}

export function* watchAddUser() {
  yield takeEvery(
    types.USER_ADDED_STARTED,
    addUser,
  );
}

function* removeUser(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);

    if (isAuth) {
      const token = yield select(selectors.getAuthToken);
      const response = yield call(
        fetch,
        `${API_BASE_URL}/api/v1/users/${action.payload.id}/`,
        {
          method: 'DELETE',
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `JWT ${token}`,
          },
        }
      );

      if (response.status === 200) {
        yield put(actions.completeRemovingUser());
        // const {
        //   entities: { users },
        //   result,
        // } = normalize(jsonResult, schemas.users);

        // yield put(
        //   actions.completeFetchingusers(
        //     users,
        //     result,
        //   ),
        // );
      } else {
        // const { non_field_errors } = yield response.json();
        // yield put(actions.failLogin(non_field_errors[0]));
      }
    }
  } catch (error) {
    // yield put(actions.failLogin('Falló horrible la conexión mano'));
    console.log("ERROR", error)
  }
}

export function* watchRemoveUser() {
  yield takeEvery(
    types.USER_REMOVED_STARTED,
    removeUser,
  );
}