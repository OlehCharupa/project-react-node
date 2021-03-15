import React from "react";
import { NavLink } from "react-router-dom";
import ProjectSidebar from "../../components/ProjectSidebar/ProjectSidebar.js";
import ProjectWrapper from "../../components/ProjectWrapper/ProjectWrapper.js";
import style from "./SprintPage.module.css";
import container from "../../components/Container/Container.module.css";

const SprintPage = () => {
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