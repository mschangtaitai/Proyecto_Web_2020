import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

// import './styles.css';
import * as selectors from '../../reducers';
import * as actions from '../../actions/events';
import EventRow from '../EventRow';

const EventList = ({ event, isLoading, onLoad }) => {
  useEffect(onLoad, []);
  return (
    <Fragment>
      {
        event.length === 0 && !isLoading && (
          <p>{'No hay eventos registrados'}</p>
        )
      }
      {
        isLoading && (
          <p>{'Cargando...'}</p>
        )
      }
      {
        event.length > 0 && !isLoading && (
          <table>
            <tbody>
              {
                event.map(({ id }) => <EventRow key={id} id={id} />)
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
    event: selectors.getEvents(state),
    isLoading: selectors.isFetchingEvents(state),
  }),
  dispatch => ({
    onLoad() {
      dispatch(actions.startFetchingEvents());
    },
  }),
)(EventList);