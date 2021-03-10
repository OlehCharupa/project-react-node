import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { paths } from "../../routes/routes";
import style from "./UserMenu.module.css";
import authOperation from "../../redux/operations/authOperations";
import { getUserName } from "../../redux/selectors/authSelectors";

const UserMenu = () => {
  const dispatch = useDispatch();
  const userName = useSelector((state) => getUserName(state));
  const history = useHistory();

  const logOut = () => {
    dispatch(authOperation.logOut());
    history.push(paths.registration);
  };
  return (
    <div className={style.usermemu__wrapper}>
      <p className={style.user__name}>{userName}</p>
      <button className={style.logout__button} onClick={logOut}>
        <span className={style.logout__span}>Log Out</span>
      </button>
    </div>
  );
};

export default UserMenu;
