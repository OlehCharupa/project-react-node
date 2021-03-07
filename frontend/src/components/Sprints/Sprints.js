import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import style from "./Sprints.module.css";
import sprite from "./images/sprite.svg";
import arrowLeft from "./images/arrow-left.svg";
import arrowRight from "./images/arrow-right.svg";
import edit from "./images/edit.svg";
import tasksAction from "../../redux/actions/tasksAction";
import { filterSelector } from "../../redux/selectors/tasks-selectors";

const SprintDIV = styled.div`
  padding-top: 20px;
`;
const DateDIV = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;

  margin-bottom: 20px;

  font-size: 12px;
  line-height: 1.25;

  letter-spacing: 0.04em;
  color: rgba(24, 28, 39, 0.6);
`;
const CurrentDateDIV = styled.div`
  display: flex;
  align-items: baseline;
`;
const CurrentDateP = styled.p`
  margin-top: 0;
  margin-bottom: 0;
  margin-right: 20px;

  cursor: default;
`;
const CurrentDateSPAN = styled.span`
  font-weight: 500;
  font-size: 18px;
  line-height: 1.22;

  letter-spacing: 0.04em;
  color: #181c27;
`;
const Button = styled.button`
  display: inline-block;
  content: "";
  width: 8px;
  height: 12px;

  border: none;

  cursor: pointer;

  background-color: transparent;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;
const PrevBtn = styled(Button)`
  background-image: url(${arrowLeft});
  margin-right: 20px;
`;
const NextBtn = styled(Button)`
  background-image: url(${arrowRight});
`;
const DateP = styled.p``;
const FilterINPUT = styled.input`
  padding-left: 40px;
  width: 100%;
  height: 40px;

  border: none;
  border-bottom: 1px solid rgba(24, 28, 39, 0.2);
  outline: none;
  background-color: transparent;

  font-size: 18px;
  line-height: 1.21;
  letter-spacing: 0.04em;

  color: #000000;
`;
const FieldDIV = styled.div`
  position: relative;
  margin-bottom: 30px;
`;
const SVG = styled.svg`
  position: absolute;
  top: 50%;
  left: 10px;
  fill: #a6a6a6;

  transform: translateY(-50%);
  transition: transform 250ms linear;

  ${FilterINPUT}:hover + &,${FilterINPUT}:focus + &, &:hover, &:focus {
    fill: #ff6b08;
  }
`;
const SprintNameDIV = styled.div`
  position: relative;
  margin-bottom: 30px;
`;
const SprintNameINPUT = styled.textarea`
  width: 100%;
  min-height: 64px;

  resize: none;
  border: none;
  outline: none;
  cursor: default;

  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 26px;
  line-height: 1.23;

  letter-spacing: 0.04em;

  color: #181c27;
`;
const SprintNameBTN = styled.button`
  display: block;
  position: absolute;
  top: 6px;
  right: 0;

  content: "";
  width: 20px;
  height: 20px;

  border: none;
  cursor: pointer;

  background-color: transparent;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(${edit});
`;

const Sprints = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => filterSelector(state));

  const [sprintName, setSprintName] = useState("Sprint Burndown Chart 1");
  const changeNameHandler = (e) => {
    const nameRef = document.querySelector("textarea");
    if (nameRef.hasAttribute("readonly")) {
      nameRef.removeAttribute("readonly");
      nameRef.classList.remove(style.edit);

      nameRef.focus();
      nameRef.setSelectionRange(nameRef.value.length, nameRef.value.length);

      window.addEventListener("keydown", closeAndUpdateName);
    }
  };
  const sprintNameInputHandler = (e) => {
    const { value } = e.target;
    setSprintName(value);
  };
  const closeAndUpdateName = (e) => {
    const nameRef = document.querySelector("textarea");
    const { keyCode } = e;

    if (keyCode === 27) {
      nameRef.value = "Sprint Burndown Chart 1";
      nameRef.setAttribute("readonly", true);
      nameRef.classList.add(style.edit);
      window.removeEventListener("keydown", closeAndUpdateName);
    }
    if (keyCode === 13) {
      //update query name
      nameRef.setAttribute("readonly", true);
      nameRef.classList.add(style.edit);
      window.removeEventListener("keydown", closeAndUpdateName);
    }
  };
  return (
    <SprintDIV>
      <DateDIV>
        <CurrentDateDIV>
          <PrevBtn aria-label="previous day" />
          <CurrentDateP>
            <CurrentDateSPAN>2</CurrentDateSPAN>/12
          </CurrentDateP>
          <NextBtn aria-label="next day" />
        </CurrentDateDIV>
        <DateP>08.08.2020</DateP>
      </DateDIV>
      <FieldDIV>
        <FilterINPUT
          type="text"
          name="search"
          value={filter}
          onChange={(e) =>
            dispatch(tasksAction.changeTaskFilter(e.target.value))
          }
        />
        <SVG width="20" height="20">
          <use href={sprite + "#icon-search"}></use>
        </SVG>
      </FieldDIV>
      <SprintNameDIV>
        <SprintNameINPUT
          className={style.edit}
          value={sprintName}
          readOnly
          onChange={sprintNameInputHandler}
        />
        <SprintNameBTN onClick={changeNameHandler} />
      </SprintNameDIV>
    </SprintDIV>
  );
};

export default Sprints;
