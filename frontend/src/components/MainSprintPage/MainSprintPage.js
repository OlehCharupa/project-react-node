import React from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as ReactLogo } from "../../pages/ProjectPage/images/plus.svg";
import style from "./MainSprintPage.module.css";
import pen from "./images/pen.svg";
import add from "./images/add.svg";
// import SprintsList from "../SprintsList/SprinstList";
import container from "../Container/Container.module.css";

const MainSprintPage = () => {
  return (
    <>
      <div className={style.sprintSection}>
        <div style={{ display: "flex" }}>
          <div>
            <div className={style.titleSection}>
              <h1 className={style.title}>Project 1</h1>
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
            <NavLink className={style.link} to="/">
              <ReactLogo className={style.plusBtn} />
              <div className={style.create}>Створити проект</div>
            </NavLink>
          </div>
        </div>
        {/* <SprintsList /> */}
      </div>
    </>
  );
};

export default MainSprintPage;
