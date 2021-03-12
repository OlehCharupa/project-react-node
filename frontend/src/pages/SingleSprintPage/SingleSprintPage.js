import React from "react";
import styled from "styled-components";
import Sprints from "../../components/Sprints/Sprints";
import SprintsSidebar from "../../components/SprintsSidebar/SprintsSidebar";

const DIV = styled.div`
  @media (min-width: 768px) {
    display: flex;
  }
`;

const SingleSprintPage = () => {
  return (
    <DIV>
      <SprintsSidebar />
      <Sprints />
    </DIV>
  );
};

export default SingleSprintPage;
