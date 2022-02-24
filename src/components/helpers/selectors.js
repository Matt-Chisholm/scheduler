function getAppointmentsForDay(state, day) {
  const answer = [];
  for (const elem of state.days) {
    if (elem.name === day) {
      for (const appt of elem.appointments) {
        if (state.appointments[appt]) {
          answer.push(state.appointments[appt]);
        }
      }
    }
  }
  return answer;
}

export default getAppointmentsForDay;