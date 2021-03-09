import React from "react";
// import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import style from "./ProjectPageItem.module.css";
import { paths } from "../../routes/routes";
// import {deleteElement} from "../../redux/operations/deleteOperations"

const ProjectPageItem = () => {
  // const token = useSelector((state) => state.token);
  // const id = useSelector((state) => state.id);
  // const title = useSelector((state) => state.title)
  // const description = useSelector((state) => state.description)

  // const dispatch = useDispatch();

  // const deleteItem = () => {
  //   dispatch(deleteElement(id, token));
  // };
  return (
    <>
      <li className={style.item}>
        <NavLink to={"/"}>
          <div className={style.overlay}>
            <h2 className={style.itemTitle}>Biggest name project</h2>
            <p className={style.itemDescription}>Текст описание проекта</p>
          </div>
          <button className={style.deleteBtn}></button>
        </NavLink>
      </li>
    </>
  );
};

export default ProjectPageItem;
