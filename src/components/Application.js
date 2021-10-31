import "components/Application.scss";
import DayList from "./DayList";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Appointment from "./Appointment";
import getAppointmentsForDay, { getInterview } from 'helpers/selectors.js';

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  let dailyAppointments = {};
  let schedule = [];
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

  //console.log(state.interviewers);
  dailyAppointments = getAppointmentsForDay(state, state.day);
  schedule = Object.keys(dailyAppointments).map(appt => {
    const interview = getInterview(state, dailyAppointments[appt].interview);
    //console.log("result = " + JSON.stringify(interview));
    return (
      <Appointment
        interview={interview}
        id={dailyAppointments[appt].id}
        key={dailyAppointments[appt].id}
        time={dailyAppointments[appt].time}
      />
    );
  });

  return (<main className="layout">
    <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList days={state.days} value={state.day} onChange={setDay} />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
    </section>
    <section className="schedule">
      {schedule}
      <Appointment key="last" time="5pm" />
    </section>
  </main>
  );
}