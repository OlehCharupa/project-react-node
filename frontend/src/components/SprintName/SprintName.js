import React, { useState } from "react";
import sprintsOperations from "../../redux/operations/sprintsOperations";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import sprite from "../Sprints/images/sprite.svg";

const SprintNameDIV = styled.div`
  position: relative;
  width: 100%;

  @media (min-width: 768px) {
    width: 374px;
  }
  @media (min-width: 1280px) {
    width: 400px;
  }
`;
const SprintNameLabel = styled.p`
  width: 100%;
  padding-right: 35px;

  font-weight: 500;
  font-size: 26px;
  line-height: 1.23;

  letter-spacing: 0.04em;
  color: #181c27;

  @media (min-width: 768px) {
    font-size: 36px;
  }

  @media (min-width: 1280px) {
  }
`;
const SprintNameINPUT = styled.input`
  width: 100%;
  min-height: 64px;

  border: none;
  border-radius: 5px;
  outline: none;
  cursor: default;

  font-family: Montserrat;
  font-style: normal;
  font-weight: 500;
  font-size: 26px;
  line-height: 1.23;

  letter-spacing: 0.04em;
  color: #181c27;

  @media (min-width: 768px) {
    min-height: 88px;
    font-size: 36px;
  }

  @media (min-width: 1280px) {
    min-height: 75px;
  }
`;
const SprintNameBTN = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 6px;
  right: 0;

  content: "";
  width: 20px;
  height: 20px;

  background-color: #a6a6a6;
  border: none;
  outline: none;
  border-radius: 50%;
  cursor: pointer;

  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover,
  &:focus {
    background-color: #ff6b08;
  }
`;
const SVG = styled.svg`
  fill: #fff;
`;

const SprintName = ({ id, title }) => {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [sprintName, setSprintName] = useState(title);

  const changeNameHandler = (e) => {
    isEdit && dispatch(sprintsOperations.updateSprint(id, sprintName));
    setIsEdit(!isEdit);
  };
  const sprintNameInputHandler = (e) => {
    const { value } = e.target;
    setSprintName(value);
  };
  return (
    <SprintNameDIV>
      {isEdit ? (
        <SprintNameINPUT
          maxLength="30"
          value={sprintName}
          onChange={sprintNameInputHandler}
        />
      ) : (
        <SprintNameLabel>{sprintName}</SprintNameLabel>
      )}
      <SprintNameBTN onClick={changeNameHandler}>
        <SVG>
          {isEdit ? (
            <use href={sprite + "#icon-floppy-disk"}></use>
          ) : (
            <use href={sprite + "#icon-pencil"}></use>
          )}
        </SVG>
      </SprintNameBTN>
    </SprintNameDIV>
  );
};

export default SprintName;
