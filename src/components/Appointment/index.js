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
  // Variables holding different modes
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CANCEL = "CANCEL";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  // Transition/Show functions from useVisualMode
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // Function to save a new appointment with transition state and error handling
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
// Function to delete appt with transition state and error handling
  function deleteAppt() {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true));
  }
// Transition function for Cancel mode
  function deleteConfirmation() {
    transition(CANCEL);
  }
// Transition function for edit
  function editAppt() {
    transition(EDIT);
  }

// Appointment component itself using all of the different modes of state
  return (
    <article className="appointment">
      <Header time={props.time} />
      {/* mode for no appointment */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {/* mode for new appointment form */}
      {mode === CREATE && (
        <Form interviewers={props.interviewer} onCancel={back} onSave={save} />
      )}
      {/* mode for showing existing appt */}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          interviewers={
            props.interviewer[props.interview.interviewer - 1]
              ? props.interviewer[props.interview.interviewer - 1].name
              : "No interviewer selected"
          }
          onDelete={deleteConfirmation}
          onEdit={editAppt}
        />
      )}
      {/* mode to confirm deletion of appointment */}
      {mode === CANCEL && (
        <Confirm
          message="Are you sure?"
          onConfirm={deleteAppt}
          onCancel={back}
        />
      )}
      {/* transition mode while saving new appt */}
      {mode === SAVING && <Status message="SAVING ..." />}
      {/* transition mode while deleting appt */}
      {mode === DELETING && <Status message="DELETING..." />}
      {/* mode to edit an existing appt */}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewers={props.interviewer}
          onCancel={back}
          onSave={save}
          value={props.interview.student}
        />
      )}
      {/* Error mode for save error */}
      {mode === ERROR_SAVE && (
        <Error message="Could not save." onClose={() => back()} />
      )}
      {/* Mode for deletion error */}
      {mode === ERROR_DELETE && (
        <Error message="Could not delete." onClose={() => back()} />
      )}
    </article>
  );
}
