import "components/Application.scss";
import DayList from "./DayList";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Appointment from "./Appointment";
import getAppointmentsForDay, { getInterview, getInterviewersForDay } from 'helpers/selectors.js';
import useApplicationData  from "hooks/useApplicationData.js";


export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  let dailyAppointments = {};
  let dailyInterviewers = [];
  let schedule = [];
  
  //console.log(state.interviewers);
  dailyAppointments = getAppointmentsForDay(state, state.day);
  dailyInterviewers = getInterviewersForDay(state, state.day);

  schedule = Object.keys(dailyAppointments).map(appt => {
    const interview = getInterview(state, dailyAppointments[appt].interview);
    //console.log("result = " + JSON.stringify(interview));
    return (
      <Appointment
        interview={interview}
        interviewers={dailyInterviewers}
        id={dailyAppointments[appt].id}
        key={dailyAppointments[appt].id}
        time={dailyAppointments[appt].time}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
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