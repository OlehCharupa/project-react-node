import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import style from "./ProjectSidebarItem.module.css";
import styled from "styled-components";

const activeClassName = "nav-item-active";

const StyledLink = styled(NavLink).attrs({ activeClassName })`
  padding-left: 50px;

  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.04em;
  text-decoration: none;

  color: #181c27;

  &.${activeClassName} {
    font-weight: 700;
  }
`;

const ProjectSidebarItem = ({ id, title }) => {
  return (
    <>
      <StyledLink to={{ pathname: `/projects/${id}` }} className={style.link}>
        {title}
      </StyledLink>
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
