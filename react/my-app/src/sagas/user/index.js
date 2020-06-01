/*import {
	call,
	takeEvery,
	put,
	delay,
	select,
} from 'redux-saga/effects';

import * as selectors from '../../reducers';
import * as actions from '../../actions/auth'
import * as types from '../../';

const API_BASE_URL = 'https://azenstore.herokuapp.com/api/v1';

function* fetchUser(action) {
	const authUserID = yield select(selectors.getAuthUserID);

	try {
		const isAuth = yield select(selectors.isAuthenticated);

		if (isAuth) {
			const token = yield select(selectors.getAuthToken);
			const response = yield call(
				fetch,
				`${API_BASE_URL}/users/${authUserID}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `JWT ${token}`,
					},
				}
			);

			if (response.status === 200) {
				const jsonResult = yield response.json();
				console.log(jsonResult)
				yield put(
					actions.completeFetchingUser(jsonResult),
				);
			} else {
				const { non_field_errors } = yield response.json();
				yield put(actions.failFetchingUser(non_field_errors[0]));
			}
		}
	} catch (error) {
		yield put(actions.failFetchingUser('Server error'));
	}
}

export function* watchUserFetch() {
	yield takeEvery(
		types.USER_FETCH_STARTED,
		fetchUser,
	);
};
*/