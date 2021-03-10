import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useWindowWidth } from "@react-hook/window-size";
import { ReactComponent as ReactLogo } from "./images/Logo.svg";
import UserMenu from "../UserMenu/UserMenu";
import { paths } from "../../routes/routes";
import style from "./Header.module.css";
import { isAuthenticated } from "../../redux/selectors/authSelectors";
import { modalToggle } from "../../redux/actions/modalAction";


const Header = () => {
  const token = useSelector((state) => isAuthenticated(state));
  const onlyWidth = useWindowWidth();
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(modalToggle(false));
  
  }

  return (
    <header className={style.header}>
      <NavLink
        to={token ? paths.projects : paths.registration}
        className={style.logo__link}
      >
        <ReactLogo className={style.logo} onClick={onlyWidth<768? handleClick :null} />
      </NavLink>
      {token && <UserMenu />}
    </header>
  );
};

export default Header;
