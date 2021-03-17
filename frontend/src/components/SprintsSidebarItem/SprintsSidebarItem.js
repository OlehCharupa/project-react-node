import React from "react";
import styled from "styled-components";
import { NavLink, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

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

const SprintsSidebarItem = ({ id, title }) => {
  const { projectId } = useParams();
  return (
    <>
      <StyledLink to={{ pathname: `/projects/${projectId}/${id}` }}>
        {title}
      </StyledLink>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  const item = state.sprints.items.find((sprint) => sprint._id === ownProps.id);
  return { ...item };
};

export default connect(mapStateToProps)(SprintsSidebarItem);

SprintsSidebarItem.propTypes = {
  id: PropTypes.string.isRequired,
};
