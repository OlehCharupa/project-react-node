import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import Sprints from "../../components/Sprints/Sprints";
import SprintsSidebar from "../../components/SprintsSidebar/SprintsSidebar";
import sprintsOperations from "../../redux/operations/sprintsOperations";

const DIV = styled.div`
  @media (min-width: 768px) {
    display: flex;
  }
`;

const SingleSprintPage = () => {
  const { projectId, sprintId } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    !location.from && dispatch(sprintsOperations.fetchSprints(projectId));
  }, []);

  return (
    <DIV>
      <SprintsSidebar />
      <Sprints id={sprintId} />
    </DIV>
  );
};

export default SingleSprintPage;
