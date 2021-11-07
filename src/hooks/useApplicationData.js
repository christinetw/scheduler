
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useApplicationData(initial) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => { setState({ ...state, day }); }

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('api/interviewers')

    ]).then(all => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });

  }, []);

  /**
   * Update the number of spots available
   * @param {*} appointmentId - appointment ID
   * @param {*} modifyValue - 1 to increase, -1 to decrease
   */
  function updateSpots(appointmentId, modifyValue) {
    const days = state.days;
    for (const thisDay of days) {
      if (thisDay.appointments.includes(appointmentId)) {
        thisDay.spots += modifyValue;
        break;
      }
    }
    setState({ ...state, days });
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const url = `/api/appointments/${id}`;
    const data = `{"interview":${JSON.stringify(interview)}}`;
    return axios.put(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        updateSpots(id, -1);
        setState({...state, appointments });
      });
  }

  function cancelInterview(id) {
    const url = `/api/appointments/${id}`;
    return axios.delete(url, '', {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        updateSpots(id, 1);
        const appointments = state.appointments;
        appointments[id].interview = null;
        setState({...state, appointments });
      });


  }
  return { state, setDay, bookInterview, cancelInterview };
}