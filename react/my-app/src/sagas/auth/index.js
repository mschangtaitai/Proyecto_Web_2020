import {
    call,
    takeEvery,
    put,
    // race,
    // all,
    delay,
    select,
} from 'redux-saga/effects';
import { normalize, schema } from 'normalizr'
 // import * as selectors from '.';
import * as actions from '../../actions/auth/index';
import * as types from '../../types/auth/';
import * as selectors from '../../reducers';
import * as schemas from '../../schemas/groups'

const API_BASE_URL = 'http://127.0.0.1:8000';

export function* login(action) {
    try {
        console.log(API_BASE_URL)
        const response = yield call(
            fetch,
            `${API_BASE_URL}/api/v1/token-auth/`,
            {
                method: 'POST',
                body: JSON.stringify(action.payload),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        if (response.status === 200) {
            const { token } = yield response.json()
            console.log(token)
            console.log('hola')
            yield put(actions.completeLogin(token))
        } else {
            const { non_field_errors } = yield response.json()
            yield put(actions.failLogin(non_field_errors[0]))
        } 
    } catch (error) {
    yield put(actions.failLogin(error))     
    }
}

export function* watchLoginStarted() {
    yield takeEvery(
        types.AUTHENTICATION_STARTED,
        login,
    )
}

function* fetchGroup(action) {
    console.log('Intentando fetchear grupo')
    console.log(action)
    try {
      const isAuth = yield select(selectors.isAuthenticated);
      console.log('hellow')
      if (isAuth) {
        console.log('yep, si estoy autorizado')
        console.log(action.payload)
  
        const token = yield select(selectors.getAuthToken);
        const userID = yield select(selectors.getAuthUserID);

        const response = yield call(
          fetch,
          `${API_BASE_URL}/api/v1/users/${userID}/isstudent/`,
          {
            method: 'GET',
            headers:{
              'Content-Type': 'application/json',
              'Authorization': `JWT ${token}`,
            },
          }
        );
        
        console.log("La respuesta" )
        console.log(response)
        if (response.status === 200 || response.status === 201) {
            const jsonResult = yield response.json()
            const group = normalize(jsonResult, schemas.groups)
            console.log(group)
            console.log('aqui meti el grupo al estado')
            yield put(actions.completeGroupFetch(group))
        } else {
          const { non_field_errors } = yield response.json();
          yield put(actions.failGroupFetch(Error));
        }
      }
    } catch (error) {
       console.log("ERROR", error)
       yield put(actions.failGroupFetch(Error));
     
    }
  }
  
  export function* watchGroupFetch() {
    yield takeEvery(
      types.GROUP_FETCH_STARTED,
      fetchGroup,
    );
  }

function* refreshToken(action) {
const expiration = yield select(selectors.getAuthExpiration);
const now =  parseInt(new Date().getTime() / 1000);

if (expiration - now < 3600) {
    try {
    const token = yield select(selectors.getAuthToken);
    const response = yield call(
        fetch,
        `${API_BASE_URL}/token-refresh/`,
        {
        method: 'POST',
        body: JSON.stringify({ token }),
        headers:{
            'Content-Type': 'application/json',
        },
        },
    );

    if (response.status === 200) {
        const jResponse = yield response.json();
        yield put(actions.completeTokenRefresh(jResponse.token));
    } else {
        // TODO: poner un redirect al home (login)
        const { non_field_errors } = yield response.json();
        yield put(actions.failTokenRefresh(non_field_errors[0]));
    }
    } catch (error) {
    // TODO: poner un redirect al home (login)
    yield put(actions.failTokenRefresh('Server connection error'));
    }
}
}


export function* watchRefreshTokenStarted() {
yield takeEvery(
    types.TOKEN_REFRESH_STARTED,
    refreshToken,
);
}
