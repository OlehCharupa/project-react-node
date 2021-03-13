import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import style from "./Sprints.module.css";
import sprite from "./images/sprite.svg";
import arrowLeft from "./images/arrow-left.svg";
import arrowRight from "./images/arrow-right.svg";
import edit from "./images/edit.svg";
import tasksAction from "../../redux/actions/tasksAction";
import { filterSelector } from "../../redux/selectors/tasks-selectors";
import tasksOperations from "../../redux/operations/tasksOperations";
import TasksList from "../TasksList/TasksList";
import { useMediaQuery } from "react-responsive";
import { modalToggle } from "../../redux/actions/modalAction";
import Modal from "../../components/Modal/Modal";
import TaskCreator from "../../components/TaskCreator/TaskCreator";

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 1280 });
  return isDesktop ? children : null;
};
const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return isMobile ? children : null;
};
const Default = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 });
  return isNotMobile ? children : null;
};
const Device = ({ children }) => {
  const isNotDesktop = useMediaQuery({ maxWidth: 1279 });
  return isNotDesktop ? children : null;
};

const SprintDIV = styled.div`
  padding-top: 20px;
  padding-bottom: 100px;

  @media (min-width: 768px) {
    padding-left: 20px;
    width: calc(100% / 3 * 2);
  }
  @media (min-width: 1280px) {
    width: 100%;
    padding-left: 70px;
  }
`;
const DateDIV = styled.div`
  display: flex;
  align-items: baseline;

  @media (max-width: 767px) {
    margin-bottom: 20px;
    justify-content: space-between;
  }
  @media (min-width: 768px) {
    width: 50%;
  }

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
const ArrowBTN = styled.button`
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
const PrevBtn = styled(ArrowBTN)`
  background-image: url(${arrowLeft});
  margin-right: 20px;
`;
const NextBtn = styled(ArrowBTN)`
  background-image: url(${arrowRight});

  @media (min-width: 768px) {
    margin-right: 40px;
  }
`;
const DateP = styled.p``;
const FieldDIV = styled.div`
  position: relative;

  @media (max-width: 767px) {
    margin-bottom: 30px;
  }
  @media (min-width: 1280px) {
    position: absolute;
    top: 50%;
    right: 10px;

    transform: translateY(-50%);
  }
`;
const FilterINPUT = styled.input`
  height: 40px;

  border: none;
  outline: none;
  background-color: transparent;

  font-size: 18px;
  line-height: 1.21;
  letter-spacing: 0.04em;

  color: #000000;

  ${FieldDIV}:hover &, ${FieldDIV}:focus &, &:focus, &:hover {
    border-bottom: 1px solid #ff6b08;
  }

  @media (max-width: 1279px) {
    width: 100%;
    border-bottom: 1px solid rgba(24, 28, 39, 0.2);
  }
  @media (min-width: 1280px) {
    width: 120px;
  }
  @media (max-width: 767px) {
    padding-left: 40px;
  }
  @media (min-width: 768px) {
    padding-left: 5px;
    padding-right: 40px;
  }
`;
const SVG = styled.svg`
  position: absolute;
  top: 50%;
  fill: #a6a6a6;

  transform: translateY(-50%);
  transition: transform 250ms linear;

  ${FieldDIV}:hover &, ${FieldDIV}:focus & {
    fill: #ff6b08;
  }

  @media (max-width: 767px) {
    left: 10px;
  }
  @media (min-width: 768px) {
    right: 10px;
  }
`;
const SprintNameDIV = styled.div`
  position: relative;
  @media (max-width: 767px) {
    margin-bottom: 30px;
  }
`;
const SprintNameINPUT = styled.textarea`
  width: 100%;
  min-height: 64px;

  resize: none;
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
  display: block;
  position: absolute;
  top: 6px;
  right: 0;

  content: "";
  width: 20px;
  height: 20px;

  border: 1px solid transparent;
  border-radius: 50%;
  cursor: pointer;

  &:hover,
  &:focus {
    border: 1px solid #ff6b08;
  }

  background-color: transparent;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(${edit});
`;
const Button = styled.button`
  display: block;
  position: fixed;
  content: "";
  z-index: 10;
  padding: 0;

  width: 44px;
  height: 44px;

  border: 1px solid transparent;
  border-radius: 50%;
  cursor: pointer;
  outline: none;

  background-color: #ff6b08;
  color: #ffffff;

  font-family: Montserrat;
  font-style: normal;
  font-weight: 200;
  font-size: 43px;
  line-height: 1.2;

  display: flex;
  align-items: center;
  justify-content: center;

  letter-spacing: 0.04em;

  transition: color 250ms linear, border 250ms linear,
    background-color 250ms linear;
`;
const AddTaskBTN = styled(Button)`
  bottom: 20px;
  right: 20px;

  &:hover,
  &:focus {
    color: #ff6b08;
    background-color: #ffffff;
    border: 1px solid #ff6b08;
  }

  @media (min-width: 768px) {
    position: static;
  }
  @media (min-width: 1280px) {
    margin-right: 20px;
  }
`;
const AddTaskBtnAndLabelDIV = styled.div`
  display: flex;
  align-items: center;
`;
const AddTaskLabelP = styled.p`
  font-weight: 500;
  font-size: 18px;
  line-height: 1.22;

  letter-spacing: 0.04em;

  color: #181c27;
`;
const ShowDiagramBTN = styled(Button)`
  @media (max-width: 767px) {
    bottom: 20px;
    left: 20px;
  }
  @media (min-width: 768px) {
    bottom: 40px;
    right: 55px;
  }

  &:hover,
  &:focus {
    color: #ff6b08;
    background-color: #ffffff;
    border: 1px solid #ff6b08;
  }
`;
const DiagramSVG = styled.svg`
  fill: #ffffff;

  transition: transform 250ms linear;

  ${ShowDiagramBTN}:hover &,${ShowDiagramBTN}:focus & {
    fill: #ff6b08;
  }
`;
const HeaderDIV = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 20px;
  padding: 9px 20px;

  &:after {
    display: block;
    position: absolute;
    content: "";
    left: -20px;
    bottom: 0;

    width: calc(100vw - 255px);
    height: 1px;

    background-color: rgba(24, 28, 39, 0.1);

    @media (min-width: 1280px) {
      left: -70px;
      width: calc(100% + 50vw - 515px);
    }
  }
`;
const HeaderP = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 1.2;

  color: #181c27;

  @media (min-width: 1280px) {
    width: calc((100% - 120px) / 4);
    &:not(:last-child) {
      margin-right: 30px;
    }
  }
`;
const SprintNameAndAddBtnDIV = styled.div`
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
  @media (min-width: 768px) and (max-width: 1279px) {
    margin-bottom: 17px;
  }
  @media (min-width: 1280px) {
    margin-bottom: 30px;
  }
`;
const CurrentDateAndFilterDIV = styled.div`
  @media (min-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  @media (min-width: 768px) and (max-width: 1279px) {
    margin-bottom: 8px;
  }
  @media (min-width: 1280px) {
    margin-bottom: 20px;
  }
`;

const Sprints = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const filter = useSelector((state) => filterSelector(state));

  useEffect(() => {
    // fetch sprint tasks
    dispatch(tasksOperations.fetchTasks());
  }, []);

  const isModalOpen = useSelector((state) => state.modal);
  const toggleModal = () => {
    dispatch(modalToggle(!isModalOpen));
  };

  const [sprintName, setSprintName] = useState("Sprint Burndown Chart 1");
  const changeNameHandler = (e) => {
    const nameRef = document.querySelector("textarea");
    if (nameRef.hasAttribute("readonly")) {
      nameRef.removeAttribute("readonly");
      nameRef.classList.remove(style.edit);

      nameRef.focus();
      nameRef.setSelectionRange(nameRef.value.length, nameRef.value.length);

      window.addEventListener("keydown", closeAndUpdateName);
    } else {
      // update name query
      nameRef.setAttribute("readonly", true);
      nameRef.classList.add(style.edit);
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
      <Modal
        children={<TaskCreator />}
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
      />
      <Mobile>
        <AddTaskBTN aria-label="create task" onClick={toggleModal}>
          +
        </AddTaskBTN>
      </Mobile>
      <ShowDiagramBTN aria-label="show diagram">
        <DiagramSVG width="22" height="22">
          <use href={sprite + "#icon-diagram"}></use>
        </DiagramSVG>
      </ShowDiagramBTN>
      <CurrentDateAndFilterDIV>
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
        <Device>
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
        </Device>
      </CurrentDateAndFilterDIV>
      <SprintNameAndAddBtnDIV>
        <SprintNameDIV>
          <SprintNameINPUT
            className={style.edit}
            maxLength="20"
            value={sprintName}
            readOnly
            onChange={sprintNameInputHandler}
          />
          <SprintNameBTN onClick={changeNameHandler} />
        </SprintNameDIV>
        <AddTaskBtnAndLabelDIV>
          <AddTaskBTN aria-label="create task" onClick={toggleModal}>
            +
          </AddTaskBTN>
          <Desktop>
            <AddTaskLabelP>Створити задачу</AddTaskLabelP>
          </Desktop>
        </AddTaskBtnAndLabelDIV>
      </SprintNameAndAddBtnDIV>
      <Default>
        <HeaderDIV>
          <Desktop>
            <HeaderP>Задача</HeaderP>
          </Desktop>
          <HeaderP>
            Заплановано
            <br />
            годин
          </HeaderP>
          <HeaderP>
            Витрачено
            <br />
            год / день
          </HeaderP>
          <HeaderP>
            Витрачено
            <br />
            годин
          </HeaderP>
          <Desktop>
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
          </Desktop>
        </HeaderDIV>
      </Default>
      <TasksList />
    </SprintDIV>
  );
};

export default Sprints;
