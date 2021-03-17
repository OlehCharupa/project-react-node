import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import style from "./ProjectSidebarItem.module.css";

const ProjectSidebarItem = ({ id, title }) => {
  return (
    <>
      <NavLink to={{ pathname: `/projects/${id}` }} className={style.link}>
        <span className={style.title}>{title}</span>
      </NavLink>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  const item = state.projects.items.find(
    (project) => project._id === ownProps.id
  );
  return { ...item };
};

export default connect(mapStateToProps)(ProjectSidebarItem);

ProjectSidebarItem.propTypes = {
  id: PropTypes.string.isRequired,
};
