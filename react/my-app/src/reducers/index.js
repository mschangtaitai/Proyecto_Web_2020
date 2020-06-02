import { combineReducers } from 'redux'
import auth, * as authSelectors from  './auth/index'
import events, * as eventSelectors from './event/index'
//import { reducer as formsReducer } from 'redux-form';
//var formReducer = require('redux-form').reducer;

const reducer = combineReducers({
    auth,
    events,
})


export default reducer

export const getAuthToken = state => authSelectors.getAuthToken(state.auth);
export const getIsRegistering = state => authSelectors.getIsRegistering(state.auth);
export const getRegisteringError = state => authSelectors.getRegisteringError(state.auth);
export const getIsAuthenticating = state => authSelectors.getIsAuthenticating(state.auth);
export const getAuthenticatingError = state => authSelectors.getAuthenticatingError(state.auth);
export const isAuthenticated = state => getAuthToken(state) != null;
export const getAuthUserID = state => authSelectors.getAuthUserID(state.auth);
export const getAuthExpiration = state => authSelectors.getAuthExpiration(state.auth);
export const getAuthUsername = state => authSelectors.getAuthUsername(state.auth);
export const getIsRefreshingToken = state => authSelectors.getIsRefreshingToken(state.auth);
export const getRefreshingError = state => authSelectors.getRefreshingError(state.auth);

export const getEvent = (state, id) => eventSelectors.getEvent(state.events, id)
export const getEvents = state => eventSelectors.getEvents(state.events)
export const isFetchingEvents = state => eventSelectors.isFetchingEvents(state.events)
export const getFetchingEventsError = state => eventSelectors(state.events)
