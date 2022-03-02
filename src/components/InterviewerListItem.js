import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";
// Component for each interviewer
export default function InterviewerListItem(props) {
  // Applies correct classes depending on if selected or not
  const interviewClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });
  return (
    <li className={interviewClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}
