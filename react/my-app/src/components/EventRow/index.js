import React, {Fragment} from 'react';
import { connect } from 'react-redux';


import './styles.css';
import * as selectors from '../../reducers';
import * as actions from '../../actions/events';
import { user } from '../../schemas/users';


const EventRow = ({ name, onDelete, onAction, isConfirmed = false }) => (
  <Fragment>
  <div className={!isConfirmed ? 'event-row' : ''}>
    <div>{ name }</div>
    <div>
        {
            <button onClick={onAction}>
              {'action'}
            </button>
        }
    </div>
    <div>
      <button onClick={onDelete}>
      {'Borrar'}
      </button>
    </div>

  </div>
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

    onAction() {
      // if(user.group = 'student'){
      //   dispatch(actions.startEvenAssign(id))
      // } else {
      //   dispatch(actions.startFetchingUser(id))
      // }
    }
  }),
)(EventRow);