import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import './styles.css';
import * as selectors from '../../reducers';
import * as actions from '../../actions/tutors';


const TutorRow = ({ user, id, onDelete, isConfirmed = false}) => (
  <Fragment>
  <tr className={!isConfirmed ? 'event-row' : ''}>
    <td>{ user.name }</td>
    <td>{ user.email }</td>    
  </tr>
  </Fragment>
);

export default connect(

  (state, { id }) => ({
    ...selectors.getUser(state, id),
  })
  // (dispatch, { id }) => ({
    // onDelete() {
    //   dispatch(actions.startRemovingTutor(id));
    // }
  // }),
)(TutorRow);
