import {
  call,
  takeEvery,
  put,
  delay,
  select,
} from 'redux-saga/effects'
import { normalize } from 'normalizr'
// import * as selectors from '.';
import * as actions from '../../actions/tutors'
import * as types from '../../types/tutors'
import * as selectors from '../../reducers'
import * as schemas from '../../schemas/tutors'

const API_BASE_URL = 'http://127.0.0.1:8000'

function* fetchTutors(action) {
  console.log('Intentando fetchear')
  console.log(action)
  try {
    const isAuth = yield select(selectors.isAuthenticated);
    console.log('hellow')
    if (isAuth) {
      console.log('yep, si estoy autorizado')
      console.log(action.payload)

      const token = yield select(selectors.getAuthToken);
      const response = yield call(
        fetch,
        `${API_BASE_URL}/api/v1/tutors/coursetutors/`,
        {
          method: 'POST',
          body: JSON.stringify(action.payload),
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
          entities: { tutors },
          result,
        } = normalize(jsonResult, schemas.tutors);
      
        yield put(
          actions.completeFetchingTutors(
            tutors,
            result,
          ),
        );

      } else {
        const { non_field_errors } = yield response.json();
        yield put(actions.failFetchingTutors(Error));
      }
    }
  } catch (error) {
     console.log("ERROR", error)
     yield put(actions.failFetchingTutors(Error));
   
  }
}

export function* watchTutorFetch() {
  yield takeEvery(
    types.TUTORS_FETCH_STARTED,
    fetchTutors,
  );
}

function* addTutor(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);

    if (isAuth) {
      const token = yield select(selectors.getAuthToken);
      console.log('estamos en addTutor')

      console.log(action.payload.tutor)
      const response = yield call(
        fetch,
        `${API_BASE_URL}/api/v1/tutors/`,
        {
          method: 'POST',
          body: JSON.stringify(action.payload.tutor),
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
          actions.completeAddingTutor(
            action.payload.id,
            jsonResult,
          ),
        );
        const {
        entities: { tutors },
        result,
        } = normalize(jsonResult, schemas.tutors);

        yield put(
          actions.completeAddingTutor(
            tutors,
            result,
          ),
        );
      } else {
        const { non_field_errors } = yield response.json();
        yield put(actions.failAddingTutor(Error));
      }
    }
  } catch (error) {
    yield put(actions.failAddingTutor(error));
    console.log("ERROR", error)
  }
}

export function* watchAddTutor() {
  yield takeEvery(
    types.TUTOR_ADDED_STARTED,
    addTutor,
  );
}

function* removeTutor(action) {
  try {
    const isAuth = yield select(selectors.isAuthenticated);

    if (isAuth) {
      const token = yield select(selectors.getAuthToken);
      const response = yield call(
        fetch,
        `${API_BASE_URL}/api/v1/tutors/${action.payload.id}/`,
        {
          method: 'DELETE',
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `JWT ${token}`,
          },
        }
      );

      if (response.status === 200) {
        yield put(actions.completeRemovingTutor());
        // const {
        //   entities: { tutors },
        //   result,
        // } = normalize(jsonResult, schemas.tutors);

        // yield put(
        //   actions.completeFetchingtutors(
        //     tutors,
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

export function* watchRemoveTutor() {
  yield takeEvery(
    types.TUTOR_REMOVED_STARTED,
    removeTutor,
  );
}