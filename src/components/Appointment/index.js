import React from "react";
import "../Appointment/styles.scss";
import Header from "./Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "./Status";
import Error from "./Error";
import Confirm from "./Confirm";
import useVisualMode from "./hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CANCEL = "CANCEL";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING);

    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE, true));
  }

  function deleteAppt() {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true));
  }

  function deleteConfirmation() {
    transition(CANCEL);
  }

  function editAppt() {
    transition(EDIT);
  }
  // const interviewerName = props.interviewer ? props.interviewer[props.interview.interviewer - 1].name : 'No interviewer selected';

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && (
        <Form interviewers={props.interviewer} onCancel={back} onSave={save} />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          interviewers={props.interviewer[props.interview.interviewer -1] ? props.interviewer[props.interview.interviewer - 1].name : 'No interviewer selected'}
          onDelete={deleteConfirmation}
          onEdit={editAppt}
        />
      )}
      {mode === CANCEL && (
        <Confirm
          message="Are you sure?"
          onConfirm={deleteAppt}
          onCancel={back}
        />
      )}
      {mode === SAVING && <Status message="SAVING ..." />}
      {mode === DELETING && <Status message="DELETING..." />}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewers={props.interviewer}
          onCancel={back}
          onSave={save}
          value={props.interview.student}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error message="Could not save." onClose={() => back()} />
      )}
      {mode === ERROR_DELETE && (
        <Error message="Could not delete." onClose={() => back()} />
      )}
    </article>
  );
}
