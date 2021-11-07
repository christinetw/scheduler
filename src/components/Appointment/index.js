import React from 'react';
import 'components/Appointment/styles.scss';

import Header from './Header.js';
import Show from './Show.js';
import Empty from './Empty.js';
import Form from './Form.js';
import Status from './Status.js';
import Confirm from './Confirm.js';
import Error from './Error.js';
import useVisualMode from "hooks/useVisualMode.js"
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const EDITING = "EDITING";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
    props
      .bookInterview(props.id, interview)
      .then(response => {
        transition(SHOW);
      })
      .catch((error) => {
        transition(ERROR_SAVE, true);
      });
    }

    function destroy() {
      transition(DELETING, true);
      props.cancelInterview(props.id)
        .then(response => {
          transition(EMPTY);
        })
        .catch((error) => {
          transition(ERROR_DELETE, true);
        });
    }

    return (
      <article className='appointment' >
        <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={() => transition(CONFIRM)}
            onEdit={() => transition(EDITING)}
          />
        )}
        {mode === CREATE && (
          <Form
            interviewers={props.interviewers}
            onSave={save}
            onCancel={() => back(EMPTY)}
          />)}
        {mode === EDITING && (
          <Form
            name={props.interview.student}
            interviewer={props.interview.interviewer.id}
            interviewers={props.interviewers}
            onSave={save}
            onCancel={back}
          />
        )}
        {mode === SAVING && (
          <Status
            message="Saving..."
          />
        )}
        {mode === DELETING && (
          <Status
            message="Deleting..."
          />
        )}
        {mode === CONFIRM && (
          <Confirm
            onCancel={() => transition(SHOW)}
            onConfirm={destroy}
          />
        )}
        {mode === ERROR_SAVE && (
          <Error 
            message="Error saving appointment!"
            onClose={back}
          />
        )}
        {mode === ERROR_DELETE && (
          <Error 
            message="Error deleting appointment!"
            onClose={back}
          />
        )}
      </article>
    );
  }