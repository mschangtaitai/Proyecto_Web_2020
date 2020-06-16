import {
    call,
    takeEvery,
    put,
    delay,
    select,
  } from 'redux-saga/effects'
import { normalize } from 'normalizr'
// import * as selectors from '.';
import * as actions from '../../actions/events_users'
import * as types from '../../types/events_users'
import * as selectors from '../../reducers'
import * as schemas from '../../schemas/event_assigns'


const API_BASE_URL = 'http://127.0.0.1:8000'

function* fetchEventsUsers(action) {
console.log('Intentando fetchear')
console.log(action)
try {
    const isAuth = yield select(selectors.isAuthenticated);
    //console.log('hellow')
    if (isAuth) {
    console.log('yep, si estoy autorizado')
    console.log(action.payload)

    const token = yield select(selectors.getAuthToken);
    const response = yield call(
        fetch,
        `${API_BASE_URL}/api/v1/event_assigns/`,
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
        entities: { event_assigns },
        result,
        } = normalize(jsonResult, schemas.event_assigns);
    
        yield put(
        actions.completeFetchingUsersEvents(
            event_assigns,
            result,
        ),
        );

    } else {
        const { non_field_errors } = yield response.json();
        yield put(actions.failFetchingUsersEvent(Error));
    }
    }
} catch (error) {
    console.log("ERROR", error)
    yield put(actions.failFetchingUsersEvent(Error));
    
}
}

export function* watchEventUserFetch() {
yield takeEvery(
    types.EVENTS_USERS_FETCH_STARTED,
    fetchEventsUsers,
);
}

function* addEventUser(action) {
try {
    console.log('holaaaa')
    const isAuth = yield select(selectors.isAuthenticated);

    if (isAuth) {
    console.log('estoy auth padreeee')
    const token = yield select(selectors.getAuthToken);
    console.log('estoy es mi payload')

    console.log(action.payload.user_event)
    const response = yield call(
        fetch,
        `${API_BASE_URL}/api/v1/event_assigns/`,
        {
        method: 'POST',
        body: JSON.stringify(action.payload.user_event),
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `JWT ${token}`,
        },
        }
    );
        
    console.log(action.payload)
    if (response.status === 201 || response.status === 200) {
        const jsonResult = yield response.json();
        console.log(jsonResult)
        yield put(
        actions.completeAddingUserEvent(
            action.payload.user_event.id,
            jsonResult,
        ),
        );
        const {
        entities: { events_user },
        result,
        } = normalize(jsonResult, schemas.event_assign);

        yield put(
        actions.completeAddingUserEvent(
            events_user,
            result,
        ),
        );
    } else {
        const { non_field_errors } = yield response.json();
        yield put(actions.failtAddingUserEvent(Error));
    }
    }
} catch (error) {
    yield put(actions.failtAddingUserEvent(error));
    console.log("ERROR", error)
}
}
  
export function* watchAddUserEvent() {
yield takeEvery(
    types.EVENT_USER_ADDED_STARTED,
    addEventUser,
);
}

function* removeUserEvent(action) {
    try {
      const isAuth = yield select(selectors.isAuthenticated);
  
      if (isAuth) {
        const token = yield select(selectors.getAuthToken);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/api/v1/event_assigns/${action.payload.id}/`,
          {
            method: 'DELETE',
            headers:{
              'Content-Type': 'application/json',
              'Authorization': `JWT ${token}`,
            },
          }
        );
  
        if (response.status === 200) {
            /*
          const jsonResult = yield response.json();
        
          yield put(actions.completeRemovingUserEvent());
           const {
             entities: { user_events },
             result,
           } = normalize(jsonResult, schemas.user_events);
  
           yield put(
             actions.completeFetchingUsersEvents(
               user_events,
               result,
             ),
           );
           */
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
  
  export function* watchRemoveUserEvent() {
    yield takeEvery(
      types.EVENT_USER_REMOVED_STARTED,
      removeUserEvent,
    );
  }