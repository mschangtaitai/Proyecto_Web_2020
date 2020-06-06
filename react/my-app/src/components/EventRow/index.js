import React, {Fragment, useEffect} from 'react';
import { connect } from 'react-redux';


import './styles.css';
import * as selectors from '../../reducers';
import * as actions from '../../actions/events';
import { user } from '../../schemas/users';
import * as authActions from '../../actions/auth/index'


const EventRow = ({ event, fetch, group = [], id, onDelete, onAction, isConfirmed = false }) => {
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
  (state, { id }) => ({
    ...selectors.getEvent(state, id),
    group: selectors.getGroup(state)

  }),
  (dispatch, { id }) => ({
    onDelete() {
      dispatch(actions.startRemovingEvent(id));
    },
    fetch(){
      dispatch(authActions.startGroupFetch())
    },
  }),
)(EventRow);