import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as ReactLogo } from "./images/plus.svg";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { allProjectsSelector } from "../../redux/selectors/projects-selectors";
import projectsOperations from "../../redux/operations/projectsOperations";
import ProjectPageItem from "../../components/ProjectPageItem/ProjectPageItem";
import style from "./ProjectPage.module.css";
import container from "../../components/Container/Container.module.css";

const ProjectPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(projectsOperations.fetchProjects());
    }, []);

    const projects = useSelector((state) => allProjectsSelector(state));
    const location = useLocation();
    const history = useHistory();

    const projectHandler = (e) => {
      const { projectId } = e.currentTarget.dataset;
      if (e.target.nodeName !== "BUTTON") {
        history.push({
          pathname: `/${projectId}`,
          from: location,
        });
      }
    };

  return (
    <>
      <div className={(container, style.mainPage)}>
        <div>
          <h1 className={style.title}>Проекти</h1>
        </div>
        <NavLink className={style.link} to="/">
          <ReactLogo className={style.plusBtn} />
          <div className={style.create}>Створити проект</div>
        </NavLink>
      </div>
      <ul className={style.list}>
          {projects.map((project) =>  <ProjectPageItem {...project} key={project.id} onClick={projectHandler}/>)}
        </ul>
    </>
  );
};

export default ProjectPage;
