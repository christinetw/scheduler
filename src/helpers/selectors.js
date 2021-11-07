
/**
 * Get all the apointments for the given day
 * @param {} state application state
 * @param {*} day day of the week we're interested in
 * @returns all appointments for the day
 */
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

/**
 * Get all interviewers on the given day
 * @param {} state application state
 * @param {*} day day of the week we are interested in
 * @returns all interviewers for this day
 */
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

/**
 * Get interview object with interviewer and student
 * @param {} state application state
 * @param {*} interview interview object
 * @returns new interview object with student
 */
export function getInterview(state, interview) {

  let interviewersObj = state.interviewers;
  let result = {};

  if (!interviewersObj || !interview) return null;

  const intObj = interviewersObj[interview.interviewer];
  result["interviewer"] = intObj;
  result["student"] = interview.student;

  return result;
}