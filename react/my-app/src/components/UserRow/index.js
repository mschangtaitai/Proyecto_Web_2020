import React from 'react';
import { connect } from 'react-redux';

import './styles.css';
import * as selectors from '../../reducers';
import * as actions from '../../actions/users';


const UserRow = ({ name, onDelete, isConfirmed = false }) => (
  <tr className='user'>
    <td>{ name }</td>
    <td>Este es un usuario</td>
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
    ...selectors.getUser(state, id),
  }),
  (dispatch, { id }) => ({
    onDelete() {
      dispatch(actions.startRemovingUser(id));
    }
  }),
)(UserRow);