import { useEffect, useState } from "react";
import axios from "axios";


export default function useApplicationData() {
  // Grabbing needed states 
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  // Day State Updater
  const setDay = (day) => setState({ ...state, day });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    // Grabbing day for spot handling
    const foundDay = state.days.find((day) => day.appointments.includes(id));
    // Dynamically updating spots by removing one on selected day (while booking new appt)
    const days = state.days.map((day) => {
      if (
        day.name === foundDay.name &&
        state.appointments[id].interview === null
      ) {
        return { ...day, spots: day.spots - 1 };
      } else {
        return day;
      }
    });
    // API call to add new appt and update state
    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
      setState({
        ...state,
        appointments,
        days,
      });
    });
  }
// Function to Delete/Cancel Interview with spot updating
  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    // Handling dynamic Spots updating
    const foundDay = state.days.find((day) => day.appointments.includes(id));
    const days = state.days.map((day) => {
      if (day.name === foundDay.name) {
        return { ...day, spots: day.spots + 1 };
      } else {
        return day;
      }
    });
    // Deleting from API with axios and updating state
    return axios.delete(`/api/appointments/${id}`, appointment).then(() => {
      setState({ ...state, appointments, days });
    });
  }

  // API call to scheduler-api
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

  return { state, setDay, bookInterview, cancelInterview };
}
