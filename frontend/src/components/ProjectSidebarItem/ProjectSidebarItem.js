import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import style from "./ProjectSidebarItem.module.css";

const ProjectSidebarItem = ({ id, name }) => {
  const location = useLocation();
  const history = useHistory();

  const projectHandler = (e) => {
    const { projectId } = e.currentTarget.dataset;
    if (e.target.nodeName !== "BUTTON") {
      history.push({
        pathname: `/${projectId}`,
        from: location,
      });
    }
  };

  return (
    <>
      <NavLink to="/" className={style.link}>
        <li
          className={style.item}
          onClick={projectHandler}
          data-project-id={id}
        >
          <button className={style.colorItem}></button>
          <span className={style.title}>{name}</span>
        </li>
      </NavLink>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  const item = state.projects.items.find(
    (project) => project.id === ownProps.id
  );
  return { ...item };
};

export default connect(mapStateToProps)(ProjectSidebarItem);

ProjectSidebarItem.propTypes = {
  id: PropTypes.string.isRequired,
};
