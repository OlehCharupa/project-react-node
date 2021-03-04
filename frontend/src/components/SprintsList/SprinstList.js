import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import styled from "styled-components";
import { TransitionGroup } from "react-transition-group";
import transition from "styled-transition-group";
import SprintsListItem from "../SprintsListItem/SprintsListItem";
import { allSprintsSelector } from "../../redux/selectors/sprints-selectors";
import sprintsOperations from "../../redux/operations/sprintsOperations";

const Ul = styled.ul`
  padding: 0;
  list-style: none;
  @media (min-width: 768px) {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;

    margin: -10px;
  }
  @media (min-width: 1280px) {
    margin: -15px;
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
  padding: 20px 20px 40px 20px;

  cursor: pointer;

  background-color: #FFFFFF;
  box-shadow: 0px 6px 26px rgba(0, 5, 97, 0.1);
  border-radius: 5px;

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

    @media (min-width: 768px) {
      width: calc((100% - 40px) / 2);
      margin: 10px;
  }

    @media (min-width: 1280px) {
      width: calc((100% - 90px) / 3);
      margin: 15px;
      padding: 20px 30px 40px 20px;
  }
`;

const SprintsList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(sprintsOperations.fetchSprints());
  }, []);

  const sprints = useSelector((state) => allSprintsSelector(state));
  const location = useLocation();
  const history = useHistory();

  console.dir();

  const sprintHandler = (e) => {
    const { sprintId } = e.currentTarget.dataset;
    if (e.target.nodeName !== "BUTTON") {
      history.push({
        pathname: `/${sprintId}`,
        from: location,
      });
    }
  };

  return (
    <TransitionGroup component={Ul}>
      {sprints.map((sprint) => (
        <Li key={sprint.id} data-sprint-id={sprint.id} onClick={sprintHandler}>
          <SprintsListItem id={sprint.id} />
        </Li>
      ))}
    </TransitionGroup>
  );
};

export default SprintsList;
