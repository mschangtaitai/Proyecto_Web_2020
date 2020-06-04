import React from 'react';
import { connect } from 'react-redux';

import './styles.css';
import * as selectors from '../../reducers';
import * as actions from '../../actions/tutors';


const TutorRow = ({ name, onDelete, isConfirmed = false }) => (
  <tr className='tutor'>
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
    ...selectors.getTutor(state, id),
  }),
  (dispatch, { id }) => ({
    onDelete() {
      dispatch(actions.startRemovingTutor(id));
    }
  }),
)(TutorRow);