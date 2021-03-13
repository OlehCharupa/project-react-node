import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import arrow from "./images/arrow.svg";
import { allSprintsSelector } from "../../redux/selectors/sprints-selectors";
import sprintsOperations from "../../redux/operations/sprintsOperations";
import { useMediaQuery } from "react-responsive";
import SprintsSidebarItem from "../SprintsSidebarItem/SprintsSidebarItem";
import { modalToggle } from "../../redux/actions/modalAction";
import Modal from "../Modal/Modal";
import SprintCreator from "../SprintCreator/SprintCreator";

const Default = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 });
  return isNotMobile ? children : null;
};

const DIV = styled.div`
  position: relative;
  min-height: 37px;
  z-index: 100;

  @media (max-width: 767px) {
    display: flex;
    align-items: center;

    &:after {
      content: "";
      display: block;
      position: absolute;
      width: 100vw;
      height: 1px;
      background-color: rgba(24, 28, 39, 0.1);
      bottom: 0;
      left: calc((-100vw + 100%) / 2);
    }
  }

  @media (min-width: 768px) {
    position: sticky;
    height: calc(100vh - 80px);
    width: 216px;
    padding-top: 20px;
    padding-right: 27px;
    top: 0;

    &:after {
      content: "";
      display: block;
      position: absolute;
      width: 1px;
      height: 100vh;
      background-color: rgba(24, 28, 39, 0.1);
      top: 0;
      right: 0px;
    }
  }

  @media (min-width: 1280px) {
    width: 200px;
    padding-right: 30px;
  }
`;
const StyledLink = styled(Link)`
  display: block;
  position: relative;
  padding-left: 50px;

  font-family: inherit;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.21;

  letter-spacing: 0.04em;
  text-decoration: none;

  color: #181c27;

  @media (min-width: 768px) {
    margin-bottom: 60px;
  }

  &::before {
    display: block;
    position: absolute;
    content: "";
    width: 30px;
    height: 8px;

    top: 50%;
    left: 0;

    transform: translateY(-50%);
    outline: none;

    background-image: url(${arrow});
  }
`;
const UL = styled.ul`
  padding: 0;
  list-style: none;
`;
const LI = styled.li`
  position: relative;
  display: flex;
  align-items: center;

  cursor: pointer;

  &::before {
    display: block;
    position: absolute;
    content: "";
    width: 36px;
    height: 36px;
    top: 50%;
    left: 0;

    transform: translateY(-50%);

    background: #ffffff;

    border-radius: 5px;
    box-shadow: 0px 6px 26px rgba(0, 5, 97, 0.1);
  }

  &:not(:last-child) {
    margin-bottom: 30px;
  }
`;
const Button = styled.button`
  display: block;
  content: "";
  padding: 0;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 15px;

  width: 44px;
  height: 44px;

  border: 1px solid transparent;
  border-radius: 50%;
  cursor: pointer;
  outline: none;

  background-color: #ff6b08;
  color: #ffffff;

  font-family: inherit;
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

  &:hover,
  &:focus {
    color: #ff6b08;
    background-color: #ffffff;
    border: 1px solid #ff6b08;
  }
`;
const AddTaskBtnAndLabelDIV = styled.div`
  position: absolute;
  text-align: center;
  bottom: 50px;
`;
const AddTaskLabelP = styled.p`
  font-weight: 500;
  font-size: 18px;
  line-height: 1.22;

  letter-spacing: 0.04em;

  color: #181c27;
`;

const SprintsSidebar = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(sprintsOperations.fetchSprints());
  }, []);

  const sprints = useSelector((state) => allSprintsSelector(state));
  const { projectId } = useParams();

  const isModalOpen = useSelector((state) => state.modal);
  const toggleModal = () => {
    setModal(!isModalOpen);
    dispatch(modalToggle(!isModalOpen));
  };
  const [modal, setModal] = useState(isModalOpen);

  return (
    <DIV>
      {modal && (
        <Modal
          children={<SprintCreator />}
          isModalOpen={isModalOpen}
          toggleModal={toggleModal}
        />
      )}
      <StyledLink to={{ pathname: `/projects/${projectId}` }}>
        Показати спринти
      </StyledLink>
      <Default>
        <UL>
          {sprints.map((sprint) => (
            <LI key={sprint.id}>
              <SprintsSidebarItem id={sprint.id} />
            </LI>
          ))}
        </UL>
        <AddTaskBtnAndLabelDIV>
          <Button onClick={toggleModal}>+</Button>
          <AddTaskLabelP>Створити спринт</AddTaskLabelP>
        </AddTaskBtnAndLabelDIV>
      </Default>
    </DIV>
  );
};

export default SprintsSidebar;
