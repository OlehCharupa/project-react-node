import React from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as ReactLogo } from "./images/Logo.svg";
import UserMenu from "../UserMenu/UserMenu";
import { paths } from "../../routes/routes";
import style from "./Header.module.css";
import Container from "../Container/Container";

const Header = () => {
  const token = true;// замінити на значення зі стейту
  return (
      <header className={style.header}>
          <div className={style.nav__wpapper}>
      <NavLink to={token ? paths.projects : paths.registration} className={style.logo__link}>
        <ReactLogo className={style.logo} />
          </NavLink>
          {token&&<UserMenu/>}
              
        </div>

          
    </header>
  );
};

export default Header;
