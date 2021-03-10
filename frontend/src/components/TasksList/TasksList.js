import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { TransitionGroup } from "react-transition-group";
import transition from "styled-transition-group";
import TasksListItem from "../TasksListItem/TasksListItem";
import {
  getVisibleTasks,
  loaderSelector,
} from "../../redux/selectors/tasks-selectors";
import LoaderSpinner from "react-loader-spinner";

const Ul = styled.ul`
  padding: 0;
  list-style: none;

  @media (min-width: 768px) and (max-width: 1279px) {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;

    margin: -10px;
  }
`;
const Li = transition.li.attrs({
  unmountOnExit: true,
  mountOnEntry: true,
  timeout: 250,
})`
  position: relative;
  margin-top: 0;
  @media (max-width: 767px) {
      &:not(:last-child) {
    margin-bottom: 10px;
  }
  }
  @media (min-width: 1280px) {
      &:not(:last-child) {
    margin-bottom: 10px;
  }
  display:flex;
  padding: 20px;
  }

  padding: 20px 20px 50px 20px;

  cursor: default;

  background-color: #FFFFFF;
  box-shadow: 0px 6px 26px rgba(0, 5, 97, 0.1);
  border-radius: 5px;
  transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);

  &:enter { opacity: 0; 
    transform: translateX(-100%); }
  &:enter-active {
    opacity: 1;
    transform: translateX(0);
    transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1), transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  &:exit { opacity: 1;
  transform: translateX(0); }
  &:exit-active {
    opacity: 0;
    transform: translateX(-100%);
    transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1), transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
  }

    @media (min-width: 768px) and (max-width: 1279px) {
      width: calc((100% - 40px) / 2);
      margin: 10px;
    }
    @media (max-width: 1279px){
      align-items: baseline;
    }
    @media (min-width: 1280px){
      align-items: center;
    }

    &:hover, &:focus{
      transform: scale(1.02);
    }
`;
const LoaderDIV = styled.div`
  display: flex;
  justify-content: center;
`;

const TasksList = () => {
  const tasks = useSelector((state) => getVisibleTasks(state));
  const isLoading = useSelector((state) => loaderSelector(state));

  return (
    <>
      {isLoading && (
        <LoaderDIV>
          <LoaderSpinner
            type="ThreeDots"
            color="#ff6b08"
            height={100}
            width={100}
          />
        </LoaderDIV>
      )}
      <TransitionGroup component={Ul}>
        {tasks.map((task) => (
          <Li key={task.id}>
            <TasksListItem id={task.id} />
          </Li>
        ))}
      </TransitionGroup>
    </>
  );
};

export default TasksList;
