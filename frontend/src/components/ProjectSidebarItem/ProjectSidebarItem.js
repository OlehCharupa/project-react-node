import React from "react";
import { NavLink, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import style from "./ProjectSidebarItem.module.css";

const ProjectSidebarItem = ({ id, title }) => {
  const { projectId } = useParams();

  return (
    <>
      <li className={style.item}>
        <NavLink to={{ pathname: `/projects/${id}` }} className={style.link}>
          <p className={style.title}>{title}</p>
        </NavLink>
      </li>
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
