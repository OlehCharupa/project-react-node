import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as ReactLogo } from "./images/plus.svg";
import { useSelector, useDispatch } from "react-redux";
import { allProjectsSelector } from "../../redux/selectors/projects-selectors";
import projectsOperations from "../../redux/operations/projectsOperations";
import ProjectPageItem from "../../components/ProjectPageItem/ProjectPageItem";
import style from "./ProjectPage.module.css";
import container from "../../components/Container/Container.module.css";
import plus from "./images/plus.svg"

const ProjectPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(projectsOperations.fetchProjects());
  }, []);

  const projects = useSelector((state) => allProjectsSelector(state));

  return (
    <>
      <div className={(container, style.mainPage)}>
        <div>
          <h1 className={style.title}>Проекти</h1>
        </div>
        <div className={style.link} to="/">
          <button className={style.plusBtn}  type="button">
            <span style={{display:"block"}}><img src={plus} /></span>
          </button>
          <div className={style.create}>Створити проект</div>
        </div>
      </div>
      <ul className={style.list}>
        {projects.map((project) => (
          <ProjectPageItem {...project} key={project.id} id={project.id}/>
        ))}
      </ul>
    </>
  );
};

export default ProjectPage;
