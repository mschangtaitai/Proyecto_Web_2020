import React, {Fragment} from 'react';
import { connect } from 'react-redux';


import './styles.css';
import * as selectors from '../../reducers';
import * as actions from '../../actions/events';
import { user } from '../../schemas/users';


const EventRow = ({ event, id, onDelete, onAction, isConfirmed = false }) => (
  <Fragment>
  <tr className={!isConfirmed ? 'event-row' : ''}>
    <td>{ event.title }</td>
    <td>{event.date}</td>
    <td> {event.description}</td>
    <td> {event.beginTime}</td>
    <td> {event.endTime}</td>

    {/* <td>
        {
          //isConfirmed && (
            <button onClick={onAction}>
              {'action'}
            </button>
          //)
        }
    </td> */}
    <td>
      <button onClick={onDelete}>
      {'Borrar'}
      </button>
    </td>
    
  </tr>
  </Fragment>

);

export default connect(
  (state, { id }) => ({
    ...selectors.getEvent(state, id),
  }),
  (dispatch, { id }) => ({
    onDelete() {
      dispatch(actions.startRemovingEvent(id));
    },

    // onAction() {
    //   // if(user.group = 'student'){
    //   //   dispatch(actions.startEvenAssign(id))
    //   // } else {
    //   //   dispatch(actions.startFetchingUser(id))
    //   // }
    // }
  }),
)(EventRow);