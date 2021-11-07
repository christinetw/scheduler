
export default function getAppointmentsForDay(state, day) {
  if (!state.days) return [];

  let theDay = state.days.filter(d => d.name === day)[0];
  if (!theDay) return [];
  
  let result = [];
  for (const id of theDay.appointments) {
    const appointmentObj = state.appointments[id];
    result.push(appointmentObj);
  }

  return result;
}

export function getInterviewersForDay(state, day) {
  if (!state.days) return [];

  let theDay = state.days.filter(d => d.name === day)[0];
  if (!theDay) return [];

  let result = [];
  for (const id of theDay.interviewers) {
    result.push(state.interviewers[id]);
  }

  return result;
}

export function getInterview(state, interview) {

  let interviewersObj = state.interviewers;
  let result = {};

  if (!interviewersObj || !interview) {
    return null;
  }

  const intObj = interviewersObj[interview.interviewer];
  result["interviewer"] = intObj;
  result["student"] = interview.student;

  return result;
}