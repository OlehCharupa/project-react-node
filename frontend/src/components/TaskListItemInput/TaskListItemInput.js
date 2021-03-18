import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import tasksOperations from "../../redux/operations/tasksOperations";
import {
  currentDayIndexSelector,
  getCurrentDay,
  getSingleHoursWasted,
} from "../../redux/selectors/tasks-selectors";

const INPUT = styled.input`
  display: inline-block;
  padding: 0;
  width: 60px;
  height: 22px;

  border: none;
  border-bottom: 1px solid rgba(24, 28, 39, 0.2);

  transition: border 250ms linear;

  outline: none;
  text-align: right;

  font-size: 14px;
  line-height: 1.21;
  letter-spacing: 0.04em;

  color: #000000;

  &:hover,
  &:focus {
    border-bottom: 1px solid #ff6b08;
  }
`;

const TaskListItemInput = ({
  id,
  hoursPlanned,
  hoursWasted,
  hoursWastedPerDay,
}) => {
  const dispatch = useDispatch();
  const currentIndex = useSelector((state) => currentDayIndexSelector(state));
  const currentDay = useSelector((state) => getCurrentDay(state));
  const singleHoursWasted = useSelector((state) =>
    getSingleHoursWasted(state, hoursWastedPerDay)
  );
  const [hours, setHours] = useState("");

  useEffect(() => {
    setHours(singleHoursWasted);
  }, [singleHoursWasted, currentIndex]);

  const handlerInputChange = (e) => {
    const { value } = e.target;
    if (isNaN(value)) {
      return;
    }
    setHours(+value);
  };
  const blurHandler = () => {
    if (hours > 0 && hours !== singleHoursWasted) {
      dispatch(tasksOperations.updateTask(id, hours, currentDay, currentIndex));
    } else setHours(singleHoursWasted);
  };
  const moveCursorToEnd = (e) => {
    const { target } = e;
    if (typeof target.selectionStart == "number") {
      target.selectionStart = target.selectionEnd = target.value.length;
    } else if (typeof target.createTextRange != "undefined") {
      target.focus();
      var range = target.createTextRange();
      range.collapse(false);
      range.select();
    }
  };

  return (
    <INPUT
      value={hours}
      type="text"
      onChange={handlerInputChange}
      onBlur={blurHandler}
      onClick={moveCursorToEnd}
    ></INPUT>
  );
};

const mapStateToProps = (state, ownProps) => {
  const item = state.tasks.items.find((task) => task._id === ownProps.id);
  return { ...item };
};

export default connect(mapStateToProps)(TaskListItemInput);

TaskListItemInput.propTypes = {
  id: PropTypes.string.isRequired,
};
