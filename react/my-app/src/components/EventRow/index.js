import React from 'react';
import { connect } from 'react-redux';

import './styles.css';
import * as selectors from '../../reducers';
import * as actions from '../../actions/events';


const EventRow = ({ name, onDelete, isConfirmed = false }) => (
  <tr className={!isConfirmed ? 'pet-owner-row--pending' : ''}>
    <td>{ name }</td>
    <td>
      {
        isConfirmed && (
          <button
            onClick={onDelete}
          >
            {'Borrar'}
          </button>
        )
      }
    </td>
  </tr>
);

export default connect(
  (state, { id }) => ({
    ...selectors.getEvent(state, id),
  }),
  (dispatch, { id }) => ({
    onDelete() {
      dispatch(actions.startRemovingEvent(id));
    }
  }),
)(EventRow);