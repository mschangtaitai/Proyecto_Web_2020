import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import './styles.css';
import * as selectors from '../../reducers';
import * as actions from '../../actions/tutors';


const TutorRow = ({ tutor, onDelete, isConfirmed = false }) => (
  <Fragment>
  <div className={!isConfirmed ? 'tutor-row' : ''}>
    <div>{ tutor }</div>
    <div>
      <p>Este es un tutor</p>
      <button onClick={onDelete}>
      {'Borrar'}
      </button>
    </div>

  </div>
  </Fragment>
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