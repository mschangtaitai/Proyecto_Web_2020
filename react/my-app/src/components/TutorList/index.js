import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';

// import './styles.css';
import * as selectors from '../../reducers';
import * as actions from '../../actions/tutors';
import TutorRow from '../TutorRow';


const TutorList = ({ tutor, isLoading, onSubmit}) => {
  // tutor.length = 0
  // let cant = array.length
  const [course, setCourse] = useState('')

  return (
    <Fragment>
      

      <div class='col-sm-12'>
      <p>
        <input
          type="number"
          placeholder="course"
          value={course}
          onChange={e => setCourse(e.target.value)}
        />
      </p> 
      <button type="submit" class='btn btn-primary' onClick={
          () => onSubmit({course})
        }>
          {'Enviar'}
      </button>      
      </div>
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
    onSubmit(course){
      console.log('El curso:')
      console.log(course.course)
      dispatch(actions.startFetchingTutors(course.course))
    },

  }),
)(TutorList)