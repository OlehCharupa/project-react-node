import React, { useEffect } from "react";
import style from "./ProjectSidebar.module.css";
import { NavLink } from "react-router-dom";
import { ReactComponent as ReactLogo } from "../../pages/ProjectPage/images/plus.svg";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { allProjectsSelector } from "../../redux/selectors/projects-selectors";
import projectsOperations from "../../redux/operations/projectsOperations";
import ProjectSidebarList from "../ProjectSidebarItem/ProjectSidebarItem";

const ProjectSidebar = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(projectsOperations.fetchProjects());
  }, []);

  const projects = useSelector((state) => allProjectsSelector(state));

  return (
    <div className={style.mainLeftSprint}>
      <NavLink className={style.link} to="/projects">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <img className={style.arrow} alt="back arrow" />
          <p className={style.showProject}>Показати проєкт</p>
        </div>
      </NavLink>
      <ul className={style.sidebarList}>
        {projects.map((project) => (
          <ProjectSidebarList {...project} key={project._id} id={project._id} />
        ))}
      </ul>
      <NavLink className={style.linkAdd} to="/">
        <ReactLogo className={style.plusBtn} />
        <div style={{ marginTop: "15px" }}>Створити проєкт</div>
      </NavLink>
    </div>
  );
};

export default ProjectSidebar;
