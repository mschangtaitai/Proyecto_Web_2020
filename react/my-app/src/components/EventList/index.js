import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

// import './styles.css';
import * as selectors from '../../reducers';
import * as actions from '../../actions/events';
import EventRow from '../EventRow';
import 'bootstrap/dist/css/bootstrap.css';

const EventList = ({ events, isLoading, fetch, error}) => {
  // event.length = 0
  // let cant = array.length
  useEffect(fetch, []);


  return (
    <Fragment>
      {
        events.length === 0 && !isLoading && (
          <p>{'No hay eventos registrados'}</p>
        )
      }
      {
        isLoading && (
          <p>{'Cargando...'}</p>
        )
      }
      {
        events.length > 0 && !isLoading && (
          <table class="table table-borderless">
            <tbody>
              {

                events.map((event) => {
                  console.log(event)
                
                
                return(<EventRow key={event.id} id={event.id} event={event} />)
              })
                
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
    events: selectors.getEvents(state),
    isLoading: selectors.isFetchingEvents(state),
  }),
  dispatch => ({
    fetch(){
        dispatch(actions.startFetchingEvents())
    },

  }),
)(EventList)