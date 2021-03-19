import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import ProjectSidebar from "../../components/ProjectSidebar/ProjectSidebar.js";
import ProjectWrapper from "../../components/ProjectWrapper/ProjectWrapper.js";
import projectsOperations from "../../redux/operations/projectsOperations";
import style from "./SprintPage.module.css";
import container from "../../components/Container/Container.module.css";

const SprintPage = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    !location.from && dispatch(projectsOperations.fetchProjects());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={(container, style.MainPage)}>
        <ProjectSidebar />
        <ProjectWrapper id={projectId} />
      </div>
    </>
  );
};

export default SprintPage;
