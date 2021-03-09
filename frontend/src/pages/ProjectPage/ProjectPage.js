import React from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as ReactLogo } from "./images/plus.svg";
import ProjectPageItem from "../../components/ProjectPageItem/ProjectPageItem";
import style from "./ProjectPage.module.css";
import container from "../../components/Container/Container.module.css";

const ProjectPage = () => {
  // const items = useSelector((state) => state.items);
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
      {/* <ul className={style.list}>
          {items &&
            items.map((item) => <ProjectPageItem {...item} key={item.id} />)}
        </ul> */}
      <ul className={style.list}>
        <ProjectPageItem />
      </ul>
    </>
  );
};

export default ProjectPage;
