import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as ReactLogo } from "./images/plus.svg";
import { useSelector, useDispatch } from "react-redux";
import { allProjectsSelector } from "../../redux/selectors/projects-selectors";
import projectsOperations from "../../redux/operations/projectsOperations";
import ProjectPageItem from "../../components/ProjectPageItem/ProjectPageItem";
import style from "./ProjectPage.module.css";
import container from "../../components/Container/Container.module.css";
import plus from "./images/plus.svg";

import { modalToggle } from "../../redux/actions/modalAction";
import CreateProject from "../../components/CreateProject/CreateProject";
import Modal from "../../components/Modal/Modal";

const ProjectPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(projectsOperations.fetchProjects());
  }, []);

  const isModalOpen = useSelector((state) => state.modal);
  const toggleModal = () => {
    dispatch(modalToggle(!isModalOpen));
  };

  const projects = useSelector((state) => allProjectsSelector(state));

  return (
    <>
      <div className={(container, style.mainPage)}>
        <div>
          <h1 className={style.title}>Проекти</h1>
        </div>
        <div className={style.link} to="/">
          <Modal
            children={<CreateProject />}
            isModalOpen={isModalOpen}
            toggleModal={toggleModal}
          />
          <button className={style.plusBtn} type="button" onClick={toggleModal}>
            <span style={{ display: "block" }}>
              <img src={plus} />
            </span>
          </button>
          <div className={style.create}>Створити проект</div>
        </div>
      </div>
      {Array.isArray(projects) ? (
        <ul className={style.list}>
          {projects.map((project) => (
            <ProjectPageItem {...project} key={project._id} id={project._id} />
          ))}
        </ul>
      ) : (
        <h2>
          Ваша колекція проектів порожня, скористайтесь кнопкою "Створити
          проект"
        </h2>
      )}
    </>
  );
};

export default ProjectPage;
