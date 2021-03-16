import React, { useState, useEffect } from "react";
import style from "./ProjectSidebar.module.css";
import { NavLink, useParams } from "react-router-dom";
import { ReactComponent as ReactLogo } from "../../pages/ProjectPage/images/plus.svg";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { allProjectsSelector } from "../../redux/selectors/projects-selectors";
import projectsOperations from "../../redux/operations/projectsOperations";
import ProjectSidebarItem from "../ProjectSidebarItem/ProjectSidebarItem";

import { modalToggle } from "../../redux/actions/modalAction";
import CreateProject from "../../components/CreateProject/CreateProject";
import Modal from "../../components/Modal/Modal";

import plus from "../../pages/ProjectPage/images/plus.svg";

const ProjectSidebar = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(projectsOperations.fetchProjects());
  }, []);

  const projects = useSelector((state) => allProjectsSelector(state));
  const { projectId } = useParams();

  const isModalOpen = useSelector((state) => state.modal);
  const toggleModal = () => {
    setModal(!isModalOpen);
    dispatch(modalToggle(!isModalOpen));
  };

  const [modal, setModal] = useState(isModalOpen);

  return (
    <div className={style.mainLeftSprint}>
      <NavLink className={style.link} to={{ pathname: `/projects` }}>
        <div
          className={style.showProjectMain}
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
        {Array.isArray(projects) ? (
        <ul className={style.sidebarList}>
          {projects.map((project) => (
            <ProjectSidebarItem {...project} key={project._id} id={project._id} />
          ))}
        </ul>
      ) : (
        <h2>
          Ваша 
        </h2>
      )}
      </div>
      <div className={style.linkAdd}>
        {modal && (
          <Modal
            children={<CreateProject />}
            isModalOpen={isModalOpen}
            toggleModal={toggleModal}
          />
        )}
        <button className={style.plusBtn} type="button" onClick={toggleModal}>
          <span style={{ display: "block" }}>
            <img src={plus} />
          </span>
        </button>
        <div className={style.createProject}>Створити проєкт</div>
      </div>
    </div>
  );
};

export default ProjectSidebar;
