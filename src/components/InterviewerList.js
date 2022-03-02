import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";
import PropTypes from "prop-types";

// Interviewer List Component
export default function InterviewerList(props) {
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {props.interviewers.map((person) => (
          <InterviewerListItem
            key={person.id}
            avatar={person.avatar}
            name={person.name}
            setInterviewer={() => props.onChange(person.id)}
            selected={props.value === person.id}
          />
        ))}
      </ul>
    </section>
  );
}

// Requiring an array for interviewers
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
};
