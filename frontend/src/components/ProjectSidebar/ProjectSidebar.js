import React, { useEffect } from "react";
import style from "./ProjectSidebar.module.css";
import { NavLink, useParams } from "react-router-dom";
import { ReactComponent as ReactLogo } from "../../pages/ProjectPage/images/plus.svg";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { allProjectsSelector } from "../../redux/selectors/projects-selectors";
import projectsOperations from "../../redux/operations/projectsOperations";
import ProjectSidebarList from "../ProjectSidebarItem/ProjectSidebarItem"

const ProjectSidebar = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(projectsOperations.fetchProjects());
  }, []);

  const projects = useSelector((state) => allProjectsSelector(state));
  const { projectId } = useParams();

  return (
    <div className={style.mainLeftSprint}>
      <NavLink className={style.link} to={{pathname: `/projects`}}>
        <div
          className={ style.showProjectMain}
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <img className={style.arrow} alt="back arrow" />
          <p className={style.showProject}>Показати проєкт</p>
        </div>
      </NavLink>
      <div className={style.container}>
        <ul className={style.sidebarList}>
          {projects.map((project) => (
            <ProjectSidebarList {...project} key={project.id} id={project.id} />
          ))}
        </ul>
      </div>
      <NavLink className={style.linkAdd} to="/">
        <ReactLogo className={style.plusBtn} />
        <div style={{ marginTop: "15px" }}>Створити проєкт</div>
      </NavLink>
    </div>
  );
};

export default ProjectSidebar;
