import React, { useState } from "react";
import "components/Application.scss";
import DayList from "./DayList";
import InterviewerList from "./InterviewerList";
import Appointment from "./Appointment";
import getAppointmentsForDay, { getInterview } from "./helpers/selectors";
import { getInterviewersForDay } from "./helpers/selectors";
import useApplicationData from "./Appointment/hooks/useApplicationData";

export default function Application(props) {
  
  // Setting up needed states and data types for appointments and interviewers
  const { state, setDay, bookInterview, cancelInterview } =
    useApplicationData();
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);
  const [getInterviewer, setInterviewer] = useState(1);

// Main Application Component
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
            id={appointment.id}
            interview={getInterview(state, appointment.interview)}
            interviewer={dailyInterviewers}
            {...appointment}
            bookInterview={bookInterview}
            cancelInterview={cancelInterview}
          />
        ))}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
