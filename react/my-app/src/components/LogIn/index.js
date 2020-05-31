import { v4 as uuidv4 } from 'uuid';
import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import './styles.css'
import * as selectors from '../../reducers';
import * as actions from '../../actions/auth';


const LoginForm = ({
  onSubmit,
  isLoading,
  error = null,
  isAuthenticated = false,
  authUsername = '',
}) => {
  const [username, changeUsername] = useState('');
  const [password, changePassword] = useState('');

  if (isAuthenticated) {
    return (
      <h1>{`Bienvenido ${authUsername} nuevamente!`}</h1>
    );
  }
  return (
    <div class='container'>
    <div class='row justify-content-md-center'>
    <div class='col-8 offset-2'>
         
    <div class='container loginform'>
      {
        error && (
          <p>
            <strong>{ error }</strong>
          </p>
        )
      }
      <div class='row justify-content-md-center'>
      <div class='col-sm-12'>
        <h3> Welcome </h3>
      </div>
      

      <div class='col-sm-12'>
      <p>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => changeUsername(e.target.value)}
        />
      </p>       
      </div>



      <div class='col-sm-12'>
      <p>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => changePassword(e.target.value)}
        />
      </p>
      </div>

      </div>
      <div class='col-sm-12'>
      <p>
        {
          isLoading ? (
            <strong>{'Cargando...'}</strong>
          ) : (
            <button type="submit" class='btn btn-primary' onClick={
              () => onSubmit(username, password)
            }>
              {'Enviar'}
            </button>
          )
        }
      </p>
      </div>

    </div>

    </div>
 
    </div>

    </div>
    

  );
} 


export default connect(
  state => ({
    isLoading: selectors.getIsAuthenticating(state),
    error: selectors.getAuthenticatingError(state),
    isAuthenticating: selectors.getIsAuthenticating(state),
    authUsername: selectors.getAuthUsername(state),
  }),
  dispatch => ({
    onSubmit(username, password) {
      dispatch(actions.startLogin(username, password));
    },
  }),
)(LoginForm);