

import "components/Application.scss";
import DayList from "./DayList";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Appointment from "./Appointment";
import getAppointmentsForDay from 'helpers/selectors.js';


const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 3,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Archie Andrews",
      interviewer: {
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  {
    id: 5,
    time: "4pm",
  }
];








export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {}
  });
  const setDay = day => setState({ ...state, day });
  const setDays = (days) => setState(prev => ({ ...prev, days }));
 


  useEffect(() => {
    axios.get('http://localhost:8001/api/days').then((response) => {
      setDays(response.data)
      console.log(response.data)
    });
  });

  const schedule = appointments.map((appointment) => {
    return (
      <Appointment
        interview={appointment.interview}
        id={appointment.id}
        key={appointment.id}
        time={appointment.time}
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