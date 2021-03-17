import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import ProjectSidebar from "../../components/ProjectSidebar/ProjectSidebar.js";
import ProjectWrapper from "../../components/ProjectWrapper/ProjectWrapper.js";
import projectsOperations from "../../redux/operations/projectsOperations";
import style from "./SprintPage.module.css";
import container from "../../components/Container/Container.module.css";

const SprintPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    !location.from && dispatch(projectsOperations.fetchProjects());
  }, []);

  return (
    <>
      <div className={(container, style.MainPage)}>
        <ProjectSidebar />
        <ProjectWrapper />
      </div>
    </>
  );
};

export default SprintPage;
