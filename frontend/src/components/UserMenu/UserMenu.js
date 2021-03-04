import React from "react";
import { useHistory } from "react-router-dom";
import { paths } from "../../routes/routes";
import style from "./UserMenu.module.css";

const UserMenu = () => {
    const userName = 'Username'//замінити на дані зі стейту
    const history = useHistory()
  
    const logOut = () => {
        //додати logout operation
        history.push(paths.registration)
    }
    return (
        <div className={style.usermemu__wrapper}>
        <p className={style.user__name}>{userName}</p>
      <button className={style.logout__button} onClick={logOut}>
       <span className={style.logout__span}>Log Out</span> 
      </button>
        </div>
    )
};

export default UserMenu;
