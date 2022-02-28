import React from "react";
import "../Appointment/styles.scss";
import Header from "./Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "./hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE";
  const CANCEL = "CANCEL";
  const EDIT = "EDIT";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    console.log("interview", interview);
    transition(SAVING);
    props.bookInterview(props.id, interview).then(() => transition(SHOW));
  }
  function deleteAppt() {
    transition(DELETE);
    props.cancelInterview(props.id).then(() => transition(EMPTY));
  }
  function deleteConfirmation() {
    transition(CANCEL);
  }
  function editAppt() {
    transition(EDIT);
  }
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
      {mode === DELETE && <Status message="DELETING..." />}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewer}
          onCancel={back}
          onSave={save}
          value={props.interview.student}
        />
      )}
    </article>
  );
}
