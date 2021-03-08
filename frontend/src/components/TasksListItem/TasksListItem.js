import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";
import tasksOperations from "../../redux/operations/tasksOperations";
import { connect } from "react-redux";
import deleteSvg from "./images/delete.svg";

const TITLE = styled.p`
  margin-top: 0;
  text-align: center;

  font-weight: 500;
  font-size: 18px;
  line-height: 1.22;
  letter-spacing: 0.04em;

  color: #181c27;

  @media (max-width: 1279px) {
    width: 100%;
  }

  &::after {
    display: block;
    content: "";
    width: 100%;
    height: 1px;
    background-color: rgba(24, 28, 39, 0.2);

    margin-top: 8px;
  }
`;
const P = styled.p`
  font-size: 10px;
  line-height: 1.2;
  letter-spacing: 0.04em;

  color: #000000;

  @media (min-width: 768px) {
    font-size: 14px;
    line-height: 1.21;
  }

  @media (min-width: 1280px) {
    display: none;
  }
`;
const DIV = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 767px) {
    &:not(:last-child) {
      margin-bottom: 10px;
    }
    &:first-child {
      margin-bottom: 28px;
    }
  }

  font-size: 10px;
  line-height: 1.2;
  letter-spacing: 0.04em;

  color: #000000;

  @media (min-width: 768px) {
    font-size: 14px;
    line-height: 1.21;
  }

  @media (min-width: 768px) and (max-width: 1279px) {
    &:not(:last-child) {
      margin-bottom: 20px;
    }
  }

  @media (min-width: 1280px) {
    width: calc((100% - 120px) / 4);
    &:not(:last-child) {
      margin-right: 30px;
    }
  }
`;
const SPAN = styled.span`
  display: inline-block;
`;
const INPUT = styled.input`
  display: inline-block;
  padding: 0;
  width: 60px;
  height: 22px;

  border: none;
  border-bottom: 1px solid rgba(24, 28, 39, 0.2);

  outline: none;
  text-align: right;

  font-size: 14px;
  line-height: 1.21;
  letter-spacing: 0.04em;

  color: #000000;
`;
const Button = styled.button`
  display: block;
  position: absolute;
  bottom: 10px;
  right: 10px;

  @media (min-width: 1280px) {
    position: absolute;
    top: 50%;
    right: 20px;

    transform: translateY(-50%);
  }

  content: "";
  width: 20px;
  height: 20px;
  border: 1px solid transparent;
  border-radius: 50%;

  cursor: pointer;

  background-image: url(${deleteSvg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 20px;

  &:hover,
  &:focus {
    border: 1px solid #ff6b08;
  }
`;

const TasksListItem = ({
  id,
  name,
  plannedHours,
  wastedHoursPerDay,
  wastedHours,
  OnDeleteTask,
}) => {
  const dispatch = useDispatch();
  const [whpd, setWhpd] = useState(wastedHoursPerDay);

  const handlerInputChange = (e) => {
    const { value } = e.target;
    if (isNaN(value)) {
      return;
    }
    setWhpd(+value);
  };
  const blurHandler = () => {
    if (whpd > 0 && whpd !== wastedHoursPerDay) {
      dispatch(tasksOperations.updateTask(id, whpd));
    } else setWhpd(wastedHoursPerDay);
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
    <>
      <DIV>
        <TITLE>{name}</TITLE>
      </DIV>
      <DIV>
        <P>Заплановано годин</P>
        <SPAN>{plannedHours}</SPAN>
      </DIV>
      <DIV>
        <P>Витрачено год / день</P>
        <INPUT
          value={whpd}
          type="text"
          onChange={handlerInputChange}
          onBlur={blurHandler}
          onClick={moveCursorToEnd}
        ></INPUT>
      </DIV>
      <DIV>
        <P>Витрачено годин</P>
        <SPAN>{wastedHours}</SPAN>
      </DIV>
      <Button
        type="button"
        onClick={() => {
          OnDeleteTask(id);
        }}
      ></Button>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  const item = state.tasks.items.find((task) => task.id === ownProps.id);
  return { ...item };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  OnDeleteTask: () => dispatch(tasksOperations.deleteTask(ownProps.id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TasksListItem);

TasksListItem.propTypes = {
  id: PropTypes.string.isRequired,
  OnDeleteTask: PropTypes.func.isRequired,
};
