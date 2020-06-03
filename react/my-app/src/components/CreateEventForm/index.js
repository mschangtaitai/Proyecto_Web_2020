import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/events';
import { v4 as uuidv4 } from 'uuid';
import * as selectors from '../../reducers';

const CreateEventForm = ({ 
    onSubmit,
    isLoading
}) => {
  const [title, setTitle] = useState('');
  const [typeEvent, setTypeEvent] = useState('');
  const [date, setDate] = useState('');
  const [beginTime, setBeginTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [description, setDescription] = useState('');
  const [expositor, setExpositor] = useState(''); 

  return (
    <div class='container'>
    <div class='row justify-content-md-center'>
    <div class='col-8 offset-2'>
         
    <div class='container loginform'>

      <div class='row justify-content-md-center'>
      <div class='col-sm-12'>
        <h2> Let's create a new event! </h2>
      </div>
      

      <div class='col-sm-12'>
      <p>
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </p>       
      </div>



      <div class='col-sm-12'>
      <p>
        <input
          type="number"
          placeholder="typeEvent"
          value={typeEvent}
          onChange={e => setTypeEvent(e.target.value)}
        />
      </p>
      </div>

      <div class='col-sm-12'>
      <p>
        <input
          type="date"
          placeholder="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
      </p>
      </div>

      <div class='col-sm-6'>
      <p> Empieza a las...</p>
      <p>
        <input
          type="time"
          placeholder="beginTime"
          value={beginTime}
          onChange={e => setBeginTime(e.target.value)}
        />
      </p>
      </div>


      <div class='col-sm-6'>
      <p> Y termina a las...</p>
      <p>
        <input
          type="time"
          placeholder="endTime"
          value={endTime}
          onChange={e => setEndTime(e.target.value)}
        />
      </p>
      </div>

      <div class='col-sm-12'>
      <p>
        <input
          type="textbox"
          placeholder="description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </p>
      </div>     


      <div class='col-sm-12'>
      <p>
        <input
          type="text"
          placeholder="expositor"
          value={expositor}
          onChange={e => setExpositor(e.target.value)}
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
              () => onSubmit({title, typeEvent, date, beginTime, endTime, description, expositor})
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
    const event = {
        ...values,
        id: uuidv4()
    }
    console.log(event)
    dispatch(actions.startAddingEvent(event));
  },
 
})

export default connect(
  state => ({
      isLoading: selectors.isFetchingEvents(state)
  }),
  mapDispatchToProps
)(CreateEventForm);

