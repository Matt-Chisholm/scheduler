import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");
  // Function to clear interviewer and student states
  const reset = () => {
    setStudent("");
    setInterviewer(null);
  };
  // Function to reset and call onCancel
  const cancel = () => {
    reset();
    props.onCancel();
  };
  // Validation to ensure user picks an interviewer and enters a name in input
  const validate = () => {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (interviewer === null) {
      setError("Must pick an interviewer!");
      return;
    }
    setError("");
    props.onSave(student, interviewer);
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            data-testid="student-name-input"
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder={props.name || "Enter Student Name"}
            onChange={(event) => {
              setStudent(event.target.value);
              event.preventDefault();
            }}
            value={student}
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          value={interviewer}
          onChange={setInterviewer}
          interviewers={props.interviewers}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={() => validate()}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
