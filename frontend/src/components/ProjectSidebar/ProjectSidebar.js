import React, { useState } from "react";
import style from "./ProjectSidebar.module.css";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { allProjectsSelector } from "../../redux/selectors/projects-selectors";
import ProjectSidebarItem from "../ProjectSidebarItem/ProjectSidebarItem";

import { modalToggle } from "../../redux/actions/modalAction";
import CreateProject from "../../components/CreateProject/CreateProject";
import Modal from "../../components/Modal/Modal";

import plus from "../../pages/ProjectPage/images/plus.svg";

const ProjectSidebar = () => {
  const dispatch = useDispatch();

  const projects = useSelector((state) => allProjectsSelector(state));

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
        <ul className={style.sidebarList}>
          {projects.map((project) => (
            <li className={style.item} key={project._id}>
              <ProjectSidebarItem id={project._id} />
            </li>
          ))}
        </ul>
      </div>
      <div className={style.linkAdd}>
        {modal && (
          <Modal
            children={<CreateProject />}
            isModalOpen={isModalOpen}
            toggleModal={toggleModal}
          />
        )}
        <button
          style={{
            backgroundColor: "transparent",
            whiteSpace: "nowrap",
            alignItems: "center",
            height: "44px",
          }}
          type="button"
          onClick={toggleModal}
        >
          <img
            src={plus}
            className={style.plusBtn}
            style={{ width: "52px", height: "52px" }}
            alt="create project"
          />
          <div className={style.createProject}>Створити проєкт</div>
        </button>
      </div>
    </div>
  );
};

export default ProjectSidebar;
