import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

// import './styles.css';
import * as selectors from '../../reducers';
import * as actions from '../../actions/tutors';
import TutorRow from '../TutorRow';


const TutorList = ({ tutor, isLoading, fetch, error}) => {
  // tutor.length = 0
  // let cant = array.length
  useEffect(fetch, []);


  return (
    <Fragment>
      {
        tutor.length === 0 && !isLoading && (
          <p>{'No hay tutores registrados'}</p>
        )
      }
      {
        isLoading && (
          <p>{'Cargando...'}</p>
        )
      }
      {
        tutor.length > 0 && !isLoading && (
          <table>
            <tbody>
              {

                tutor.map(({ id }) => <TutorRow key={id} id={id} />)
                
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
    tutor: selectors.getTutors(state),
    isLoading: selectors.isFetchingTutors(state),
  }),
  dispatch => ({
    fetch(){
        dispatch(actions.startFetchingTutors())
    },

  }),
)(TutorList)