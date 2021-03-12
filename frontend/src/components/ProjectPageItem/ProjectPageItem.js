import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import style from "./ProjectPageItem.module.css";
import { paths } from "../../routes/routes";
import { useLocation, useHistory } from "react-router-dom";
import projectsOperations from "../../redux/operations/projectsOperations"


const ProjectPageItem = ({ id, name, description, OnDeleteProject}) => {

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
  }
  
  return (
    <>
      <li className={style.item} onClick={projectHandler} data-project-id={id}>
        <NavLink to="/">
          <div className={style.overlay}>
            <h2 className={style.itemTitle}>{name}</h2>
            <p className={style.itemDescription}>{description}</p>
          </div>
          <button className={style.deleteBtn}
            type="button"
            onClick={() => { OnDeleteProject(id); }}>
            </button>
        </NavLink>
      </li>
    </>
  );
  };
  
const mapStateToProps = (state, ownProps) => {
  const item = state.projects.items.find((project) => project.id === ownProps.id);
  return { ...item };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  OnDeleteProject: () => dispatch(projectsOperations.deleteProject(ownProps.id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectPageItem);

ProjectPageItem.propTypes = {
  id: PropTypes.string.isRequired,
  OnDeleteProject: PropTypes.func.isRequired,
}
