import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import arrow from "./images/arrow.svg";
import { allSprintsSelector } from "../../redux/selectors/sprints-selectors";
import sprintsOperations from "../../redux/operations/sprintsOperations";
import { useMediaQuery } from "react-responsive";
import SprintsSidebarItem from "../SprintsSidebarItem/SprintsSidebarItem";

const Default = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 });
  return isNotMobile ? children : null;
};

const DIV = styled.div`
  position: relative;
  min-height: 37px;

  @media (min-width: 768px) {
    position: sticky;
    height: 100%;
    width: calc(100% / 3);
    padding-top: 20px;
    padding-right: 47px;
    top: 0;

    &:after {
      content: "";
      display: block;
      position: absolute;
      width: 1px;
      height: calc(100vh - 80px);
      background-color: rgba(24, 28, 39, 0.1);
      top: 0;
      right: 20px;
    }
  }
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

const SprintsSidebar = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(sprintsOperations.fetchSprints());
  }, []);

  const sprints = useSelector((state) => allSprintsSelector(state));
  const { projectId } = useParams();

  return (
    <DIV>
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
      </Default>
    </DIV>
  );
};

export default SprintsSidebar;
