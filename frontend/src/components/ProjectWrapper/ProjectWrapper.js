import React, { useState, useEffect } from "react";
import { useSelector, useDispatch} from "react-redux";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { ReactComponent as ReactLogo } from "../../pages/ProjectPage/images/plus.svg";
import projectsOperations from "../../redux/operations/projectsOperations";
import style from "./ProjectWrapper.module.css";
import pen from "./images/pen.svg";
import container from "../Container/Container.module.css";

import SprintsList from "../SprintsList/SprinstList";
import AddPeopleProjectWrapper from "./AddPeopleProjectWrapper/AddPeopleProjectWrapper"

import { modalToggle } from "../../redux/actions/modalAction";
import Modal from "../Modal/Modal";
import SprintCreator from "../SprintCreator/SprintCreator";
import AddProjectMembers from "../AddProjectMembers/AddProjectMembers";

const ProjectWrapper = () => {
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    // fetch sprint tasks
    dispatch(projectsOperations.fetchProjects());
  }, []);

  const [projectName, setProjectName] = useState("Project 1");

  const changeNameHandler = (e) => {
    const nameRef = document.querySelector("textarea");
    if (nameRef.hasAttribute("readonly")) {
      nameRef.removeAttribute("readonly");
      nameRef.classList.remove(style.edit);

      nameRef.focus();
      nameRef.setSelectionRange(nameRef.value.length, nameRef.value.length);

      window.addEventListener("keydown", closeAndUpdateName);
    } else {
      // update name query
      nameRef.setAttribute("readonly", true);
      nameRef.classList.add(style.edit);
    }
  };

  const projectNameInputHandler = (e) => {
    const { value } = e.target;
    setProjectName(value);
  };

  const closeAndUpdateName = (e) => {
    const nameRef = document.querySelector("textarea");
    const { keyCode } = e;

    if (keyCode === 27) {
      nameRef.value = "Project 1";
      nameRef.setAttribute("readonly", true);
      nameRef.classList.add(style.edit);
      window.removeEventListener("keydown", closeAndUpdateName);
    }
    if (keyCode === 13) {
      //update query name
      nameRef.setAttribute("readonly", true);
      nameRef.classList.add(style.edit);
      window.removeEventListener("keydown", closeAndUpdateName);
    }
  };

  const isModalOpen = useSelector((state) => state.modal);
  const toggleModal = () => {
    setModal(!isModalOpen);
    dispatch(modalToggle(!isModalOpen));
  };
  
  const [modal, setModal] = useState(isModalOpen);

  return (
    <>
      {modal && (
        <Modal
          children={<SprintCreator />}
          isModalOpen={isModalOpen}
          toggleModal={toggleModal}
        />
      )}
      <div className={style.sprintSection}>
        <div style={{ display: "flex", marginBottom: "30px" }}>
          <div>
            <div className={style.titleSection}>
              <textarea
                style={{
                  width: "100%",
                  minHeight: "64px",

                  resize: "none",
                  border: "none",
                  borderRadius: "5px",
                  outline: "none",
                  cursor: "default",

                  fontFamily: "Montserrat",
                  fontStyle: "normal",
                  fontWeight: "500",
                  fontSize: "26px",
                  lineHeight: "1.23",

                  letterSpacing: "0.04em",
                  color: "#181c27",
                }}
                className={style.edit}
                maxLength="20"
                value={projectName}
                readOnly
                onChange={projectNameInputHandler}
              ></textarea>
              <button
                className={style.projectChangeNameBtn}
                onClick={changeNameHandler}
              ></button>
            </div>
            <div className={style.description}></div>
            <AddPeopleProjectWrapper />
          </div>
          <div style={{ width: "300px", position: "absolute", right: "0" }}>
            <button
              style={{ backgroundColor: "transparent" }}
              type="button"
              aria-label="create sprint"
              className={style.link}
              onClick={toggleModal}
            >
              <ReactLogo className={style.plusBtn} />
              <div className={style.create}>Створити спринт</div>
            </button>
          </div>
        </div>
        <SprintsList />
      </div>
    </>
  );
};

export default ProjectWrapper;
