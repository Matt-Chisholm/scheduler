function getAppointmentsForDay(state, day) {
  const answer = [];
  for (const arrDay of state.days) {
    if (arrDay.name === day) {
      for (const appt of arrDay.appointments) {
        if (state.appointments[appt]) {
          answer.push(state.appointments[appt]);
        }
      }
    }
  }
  return answer;
}

function getInterviewersForDay(state, day) {
  const answer = [];
  for (const arrDay of state.days) {
    if (arrDay.name === day) {
      for (const appt in state.interviewers) {
        if (state.interviewers[appt]) {
          answer.push(state.interviewers[appt]);
        }
      }
    }
  }
  return answer;
}

function getInterview(state, interview) {
  const answer = {};
  if (interview) {
    answer["student"] = interview.student;
    answer["interviewer"] = state.interviewers[interview.interviewer];
  } else {
    return null;
  }
  return answer;
}

export default getAppointmentsForDay;
export { getInterview, getInterviewersForDay };
