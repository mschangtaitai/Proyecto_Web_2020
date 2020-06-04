import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

// import './styles.css';
import * as selectors from '../../reducers';
import * as actions from '../../actions/users';
import UserRow from '../UserRow';


const UserList = ({ user, isLoading, fetch, error}) => {
  // user.length = 0
  // let cant = array.length
  useEffect(fetch, []);


  return (
    <Fragment>
      {
        user.length === 0 && !isLoading && (
          <p>{'No hay useres registrados'}</p>
        )
      }
      {
        isLoading && (
          <p>{'Cargando...'}</p>
        )
      }
      {
        user.length > 0 && !isLoading && (
          <table>
            <tbody>
              {

                user.map(({ id }) => <UserRow key={id} id={id} />)
                
              }
            </tbody>
          </table>
        )
      }
    </Fragment>
  );
};

export default connect(
  state => ({
    user: selectors.getUsers(state),
    isLoading: selectors.isFetchingUsers(state),
  }),
  dispatch => ({
    fetch(){
        dispatch(actions.startFetchingUsers())
    },

  }),
)(UserList)