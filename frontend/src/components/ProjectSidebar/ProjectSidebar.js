import React from "react";
import style from "./ProjectSidebar.module.css";
import { NavLink } from "react-router-dom";

const ProjectSidebar = () => {
  return (
    <div className={style.mainLeftSprint}>
      <NavLink className={style.link} to="/">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <img className={style.arrow} />
          <p className={style.showProject}>Показати проєкт</p>
        </div>
      </NavLink>
    </div>
  );
};

export default ProjectSidebar;
