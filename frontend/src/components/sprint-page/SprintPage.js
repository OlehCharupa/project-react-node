import React from "react";
import { NavLink } from "react-router-dom";
import style from "./SprintPage.module.css";
import plus from "./images/plus.svg";
import pen from "./images/pen.svg";
import people from "./images/people.svg";

const ProjectPage = () => {
  return (
    <>
      <div className={(style.mainProject, style.container)}>
        <div>
          <div className={style.projectName}>
            <h1 className={style.projectTitle}>NameProject</h1>
            <img
              className={style.projectTitleImg}
              src={pen}
              width="20"
              height="20"
            />
          </div>
          <p>
            Короткий опис проекту, якщо він є, розміщуєтсья тут. Ширина
            тектового блоку
          </p>
          <NavLink to="/" className={style.addPeople}>
            <img src={people} alt="" width="20" height="20" />
            <span>Добавить людей</span>
          </NavLink>
        </div>

        <div className={style.addSprint}>
          <NavLink to="/">
            <img src={plus} width="44" height="44" />
          </NavLink>
          <p>Создать спринт</p>
        </div>
        {/* <div className={styles.container}>
          <ul className={styles.list}>
            {items &&
              items.map((item) => (
                <DiaryProductsListItem {...item} key={item.id} />
              ))}
          </ul>
        </div> */}
      </div>
    </>
  );
};

export default ProjectPage;
