import React from "react";
import { NavLink, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import style from "./ProjectSidebarItem.module.css";

const ProjectSidebarItem = ({ id, name }) => {
  const { projectId } = useParams();

  return (
    <>
      <li className={style.item}>
        <NavLink
          to={{ pathname: `/projects/${projectId}/${id}` }}
          className={style.link}
        >
          <span className={style.title}>{name}</span>
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
