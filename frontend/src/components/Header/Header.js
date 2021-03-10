import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { ReactComponent as ReactLogo } from "./images/Logo.svg";
import UserMenu from "../UserMenu/UserMenu";
import { paths } from "../../routes/routes";
import style from "./Header.module.css";
import { isAuthenticated } from "../../redux/selectors/authSelectors";

const Header = () => {
  const token = useSelector((state) => isAuthenticated(state));
  return (
    <header className={style.header}>
      <NavLink
        to={token ? paths.projects : paths.registration}
        className={style.logo__link}
      >
        <ReactLogo className={style.logo} />
      </NavLink>
      {token && <UserMenu />}
    </header>
  );
};

export default Header;
