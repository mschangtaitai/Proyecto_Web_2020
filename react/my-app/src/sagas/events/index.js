import {
    call,
    takeEvery,
    put,
    // race,
    // all,
    delay,
    select,
} from 'redux-saga/effects';
import { normalize } from 'normalizr'
 // import * as selectors from '.';
import * as actions from '../../actions/events';
import * as types from '../../types/events';
import * as selectors from '../../reducers'
import * as schemas from '../../schemas/events'

const API_BASE_URL = 'http://127.0.0.1:8000';

function* fetchEvents(action) {
    console.log(fetchEvents)
    try {
      const isAuth = yield select(selectors.isAuthenticated);
      console.log('hellow')
      if (isAuth) {
        console.log('yep, si estoy autorizado')
        const token = yield select(selectors.getAuthToken);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/api/v1/events/`,
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
            entities: { events },
            result,
          } = normalize(jsonResult, schemas.events);
        
          yield put(
            actions.completeFetchingEvents(
              events,
              result,
            ),
          );

        } else {
          const { non_field_errors } = yield response.json();
          yield put(actions.failFetchingEvent(Error));
        }
      }
    } catch (error) {
       console.log("ERROR", error)
       yield put(actions.failFetchingEvent(Error));
     
    }
  }
  
  export function* watchEventFetch() {
    yield takeEvery(
      types.EVENT_ADDED_STARTED,
      fetchEvents,
    );
  }
  
  function* addEvent(action) {
    try {
      const isAuth = yield select(selectors.isAuthenticated);
  
      if (isAuth) {
        const token = yield select(selectors.getAuthToken);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/api/v1/events/`,
          {
            method: 'POST',
            body: JSON.stringify(action.payload),
            headers:{
              'Content-Type': 'application/json',
              'Authorization': `JWT ${token}`,
            },
          }
        );
  
        if (response.status === 201) {
          const jsonResult = yield response.json();
          yield put(
            actions.completeAddingEvent(
              action.payload.id,
              jsonResult,
            ),
          );
          // const {
          //   entities: { events },
          //   result,
          // } = normalize(jsonResult, schemas.events);
  
          // yield put(
          //   actions.completeFetchingEvents(
          //     events,
          //     result,
          //   ),
          // );
        } else {
          // const { non_field_errors } = yield response.json();
          // yield put(actions.failLogin(non_field_errors[0]));
        }
      }
    } catch (error) {
      yield put(actions.failAddingEvent(error));
      console.log("ERROR", error)
    }
  }
  
  export function* watchaddEvent() {
    yield takeEvery(
      types.EVENT_ADDED_STARTED,
      addEvent,
    );
  }
  
function* removeEvent(action) {
    try {
      const isAuth = yield select(selectors.isAuthenticated);
  
      if (isAuth) {
        const token = yield select(selectors.getAuthToken);
        const response = yield call(
          fetch,
          `${API_BASE_URL}/api/v1/events/${action.payload.id}/`,
          {
            method: 'DELETE',
            headers:{
              'Content-Type': 'application/json',
              'Authorization': `JWT ${token}`,
            },
          }
        );
  
        if (response.status === 200) {
          yield put(actions.completeRemovingEvent());
          // const {
          //   entities: { events },
          //   result,
          // } = normalize(jsonResult, schemas.events);
  
          // yield put(
          //   actions.completeFetchingEvents(
          //     events,
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
  
  export function* watchRemoveEvent() {
    yield takeEvery(
      types.EVENT_REMOVED_STARTED,
      removeEvent,
    );
  }