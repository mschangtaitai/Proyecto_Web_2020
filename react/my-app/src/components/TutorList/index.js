import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';

// import './styles.css';
import * as selectors from '../../reducers';
import * as actions from '../../actions/tutors';
import * as userActions from '../../actions/users';
import TutorRow from '../TutorRow';


const TutorList = ({ tutor, user, fetch, isLoading, onSubmit}) => {
  // tutor.length = 0
  // let cant = array.length
  const [course, setCourse] = useState('')
  useEffect(fetch, [])
  console.log('la lista de users')
  console.log(user)

  return (
    <Fragment>
      

      <div class='col-sm-12'>
      <h1>Buscar Tutor</h1>
      <p>
        <input
          type="number"
          placeholder="course"
          value={course}
          onChange={e => setCourse(e.target.value)}
        />
      </p> 
      <button type="submit" class='btn btn-primary' onClick={
          () => onSubmit()
        }>
          {'Buscar'}
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
          <table class="table table-borderless">
            <tbody>
              {
                
                tutor.map((i) => {
                  if (i.course == course){
                    return(
                    user.map( userTutor => {
                      console.log(userTutor)
                      console.log(i)
                      console.log(userTutor.id == i.user_id)
                      if(userTutor.id == i.user_id){
                        console.log('si soy true')
                        console.log(userTutor.id)
                        console.log(userTutor)
                        return(
                        <TutorRow key={userTutor.id} id={userTutor.id} user={userTutor}/>
                        )
                      }
                    }
                    )
                    )
                  
                    // const userTutors = user.map( element => {
                    //   console.log('blabla')
                    //   console.log(element.id)

                    //   console.log(element.id == i.user_id)
                    //   if(element.id == i.user_id){
                    //     console.log(element)
                    //     return(
                    //     <TutorRow key={element.id} user={element}/>
                    //     )
                    //   }
                    // }
                    

                    // )
                    // const userData = i.user_id
                    // console.log('este es el user data')
                    // console.log(userData)  
                  }
                }
                
                )              
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
    user: selectors.getUsers(state),
    isLoading: selectors.isFetchingTutors(state),
  }),
  dispatch => ({
    onSubmit(){
      dispatch(actions.startFetchingTutors())
    },
    fetch(){
      dispatch(userActions.startFetchingUsers())
    }

  }),
)(TutorList)