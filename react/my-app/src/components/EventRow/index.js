import React, {Fragment, useEffect} from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import './styles.css';
import * as selectors from '../../reducers';
import * as actions from '../../actions/events';
import { user } from '../../schemas/users';
import * as authActions from '../../actions/auth/index'
import * as actionsUserEvents from '../../actions/events_users'

const EventRow = ({ event, fetch, joinEvent, group = [], id, onDelete, onAction, isConfirmed = false }) => {
  useEffect(fetch, []);
  
  return(
  <Fragment>
  <tr className={!isConfirmed ? 'event-row' : ''}>
    <td>{ event.title }</td>
    <td>{event.date}</td>
    <td> {event.description}</td>
    <td> {event.beginTime}</td>
    <td> {event.endTime}</td>
    {
      group != null && group[0] === true && (
    <td>
        <button onClick={joinEvent}>
          {'unirme'}
        </button>
      </td> 
      )
    }  
    {
    group != null && group[0] === false && (
    <td>
      <button onClick={onDelete}>
      {'Borrar'}
      </button>
    </td>
    )
  } 
    
  </tr>
  </Fragment>
  )
};

export default connect(
  (state, { id, userid }) => ({
    ...selectors.getEvent(state, id),
    group: selectors.getGroup(state),
    //userEvent: selectors.getUser(state).filter(eventUser => eventUser.event == id)
    userEvent: selectors.getUsersOfEvent(state, id),
    userid: selectors.getAuthUserID(state)

  }),
  (dispatch, { id, userid }) => ({
    onDelete() {
      dispatch(actions.startRemovingEvent(id));
    },
    fetch(){
      dispatch(authActions.startGroupFetch())
    },
    joinEvent() {
      const user_event = {
        id: uuidv4(),
        user: userid,
        event: id
      }
      dispatch(actionsUserEvents.startAddingUserEvent(user_event))
    },
    fetch2(){
      dispatch(actionsUserEvents.startFetchingUsersEvents());
    },
  }),
)(EventRow);
