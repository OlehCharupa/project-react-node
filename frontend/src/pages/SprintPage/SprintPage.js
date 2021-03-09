import React from "react";
import { NavLink } from "react-router-dom";
import LeftSprintPage from "../../components/LeftSprintPage/LeftSprintPage.js";
import MainSprintPage from "../../components/MainSprintPage/MainSprintPage.js";
import style from "./SprintPage.module.css";
import container from "../../components/Container/Container";

const SprintPage = () => {
  // const items = useSelector((state) => state);
  return (
    <>
      <div className={(container, style.MainPage)}>
        <LeftSprintPage />
        <MainSprintPage />
      </div>
    </>
  );
};

export default SprintPage;
