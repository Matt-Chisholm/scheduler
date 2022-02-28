import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import InterviewerList from "./InterviewerList";
import Appointment from "./Appointment";
import getAppointmentsForDay from "./helpers/selectors";
import { getInterviewersForDay } from "./helpers/selectors";



export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers: {},
  });
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);
  const [getInterviewer, setInterviewer] = useState(1);
  const setDay = (day) => setState({ ...state, day });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({
      ...state,
      appointments
    });
    return axios.put(`/api/appointments/${id}`, appointment);
  }

  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    setState({...state, appointments})
    return axios.delete(`/api/appointments/${id}`, appointment)
  }
  

  useEffect(() => {
    const first = axios.get(`/api/days`);
    const second = axios.get(`/api/appointments`);
    const third = axios.get(`/api/interviewers`);
    Promise.all([first, second, third]).then((response) => {
      setState((prev) => ({
        ...prev,
        days: response[0].data,
        appointments: response[1].data,
        interviewers: response[2].data,
      }));
    });
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            value={state.day}
            setDay={setDay}
          />
          <InterviewerList
            interviewers={dailyInterviewers}
            value={getInterviewer}
            onChange={setInterviewer}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {dailyAppointments.map((appointment) => (
          <Appointment
          key={appointment.id}
          interviewer={dailyInterviewers}
          {...appointment}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
        />)
        )}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
