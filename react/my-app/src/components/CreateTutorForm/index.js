import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/tutors';
import { v4 as uuidv4 } from 'uuid';
import * as selectors from '../../reducers';

const CreateTutorForm = ({ 
    onSubmit,
    isLoading
}) => {
  const [user_id, setUser_id] = useState('')
  const [course, setCourse] = useState('')

  return (
    <div class='container'>
    <div class='row justify-content-md-center'>
    <div class='col-8 offset-2'>
         
    <div class='container loginform'>

      <div class='row justify-content-md-center'>
      <div class='col-sm-12'>
        <h2> Let's create a new tutor! </h2>
      </div>
      

      <div class='col-sm-12'>
      <p>
        <input
          type="number"
          placeholder="student"
          value={user_id}
          onChange={e => setUser_id(e.target.value)}
        />
      </p>       
      </div>



      <div class='col-sm-12'>
      <p>
        <input
          type="number"
          placeholder="course"
          value={course}
          onChange={e => setCourse(e.target.value)}
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
              () => onSubmit({user_id, course})
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

/*const mapStateToProps = state => ({
    error: selectors.err
})*/

const mapDispatchToProps = dispatch => ({
  onSubmit(values) {
    const tutor = {
        ...values,
        id: uuidv4()
    }
    console.log(tutor)
    dispatch(actions.startAddingTutor(tutor));
  },
 
})

export default connect(
  state => ({
      isLoading: selectors.isFetchingTutors(state)
  }),
  mapDispatchToProps
)(CreateTutorForm);

