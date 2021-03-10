import React from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as ReactLogo } from "./images/Logo.svg";
import UserMenu from "../UserMenu/UserMenu";
import { paths } from "../../routes/routes";
import style from "./Header.module.css";
import Modal from "../Modal/Modal";


const Header = () => {
  const token = true;// замінити на значення зі стейту
  return (
      <header className={style.header}>
       
      <NavLink to={token ? paths.projects : paths.registration} className={style.logo__link}>
        <ReactLogo className={style.logo} />
          </NavLink>
      <Modal/>
      {token && <UserMenu />}          
    </header>
  );
};

export default Header;
