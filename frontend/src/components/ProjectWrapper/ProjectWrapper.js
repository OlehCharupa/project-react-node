import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { ReactComponent as ReactLogo } from "../../pages/ProjectPage/images/plus.svg";
import projectsOperations from "../../redux/operations/projectsOperations";
import style from "./ProjectWrapper.module.css";
import pen from "./images/pen.svg";
import add from "./images/add.svg";
import SprintsList from "../SprintsList/SprinstList";
import container from "../Container/Container.module.css";

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

  return (
    <>
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
            <div className={style.description}>
              Короткий опис проекту, якщо він є, розміщуєтсья тут. Ширина
              тектового блоку.
            </div>
            <div className={style.addPeople}>
              <img src={add} style={{ width: "20px", marginRight: "10px" }} />
              <NavLink to="/">
                <span style={{ color: "#181C27" }}>Додати людей</span>
              </NavLink>
            </div>
          </div>
          <div style={{ width: "300px", position: "absolute", right: "0" }}>
            <NavLink className={style.link} to="/">
              <ReactLogo className={style.plusBtn} />
              <div className={style.create}>Створити спринт</div>
            </NavLink>
          </div>
        </div>
        <SprintsList />
      </div>
    </>
  );
};

export default ProjectWrapper;
