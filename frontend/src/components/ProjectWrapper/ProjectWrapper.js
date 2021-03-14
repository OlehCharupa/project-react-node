import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ReactComponent as ReactLogo } from "../../pages/ProjectPage/images/plus.svg";
import style from "./ProjectWrapper.module.css";
import pen from "./images/pen.svg";
import add from "./images/add.svg";
import SprintsList from "../SprintsList/SprinstList";
import container from "../Container/Container.module.css";
import { modalToggle } from "../../redux/actions/modalAction";
import Modal from "../Modal/Modal";
import SprintCreator from "../SprintCreator/SprintCreator";

const ProjectWrapper = () => {
  const dispatch = useDispatch();
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
              <h1 className={style.title}>Project 1 dfsgsdfg dfgdsfgsdfg</h1>
              <img src={pen} style={{ width: "20px", marginLeft: "20px" }} />
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
            <button
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
