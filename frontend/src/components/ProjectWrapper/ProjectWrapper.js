import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import style from "./ProjectWrapper.module.css";
import plus from "../../pages/ProjectPage/images/plus.svg";
import ProjectName from "../ProjectName/ProjectName";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import SprintsList from "../SprintsList/SprinstList";
import AddPeopleProjectWrapper from "./AddPeopleProjectWrapper/AddPeopleProjectWrapper";

import { modalToggle } from "../../redux/actions/modalAction";
import Modal from "../Modal/Modal";
import SprintCreator from "../SprintCreator/SprintCreator";

const ProjectWrapper = ({ id, title }) => {
  const dispatch = useDispatch();

  const isModalOpen = useSelector((state) => state.modal);
  const toggleModal = () => {
    setModal(!isModalOpen);
    dispatch(modalToggle(!isModalOpen));
  };

  const [modal, setModal] = useState(isModalOpen);

  return (
    <>
      {modal && (
        <Modal
          children={<SprintCreator />}
          isModalOpen={isModalOpen}
          toggleModal={toggleModal}
        />
      )}
      <div className={style.sprintSection}>
        <div style={{ display: "flex", marginBottom: "30px" }}>
          <div>
            <div className={style.titleSection}>
              {title && <ProjectName id={id} title={title} />}
            </div>
            <div className={style.description}></div>
            <AddPeopleProjectWrapper />
          </div>
          <div style={{ width: "300px", position: "absolute", right: "0" }}>
            <button
              style={{
                backgroundColor: "transparent",
                display: "flex",
                whiteSpace: "nowrap",
                alignItems: "center",
                height: "44px",
                width: "100px",
              }}
              type="button"
              aria-label="create sprint"
              className={style.link}
              onClick={toggleModal}
            >
              <img
                src={plus}
                className={style.plusBtn}
                style={{ width: "52px", height: "52px", margin: "0" }}
                alt="add sprint"
              />
              <div className={style.create}>Створити спринт</div>
            </button>
          </div>
        </div>
        <SprintsList />
      </div>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  const item = state.projects.items.find(
    (project) => project._id === ownProps.id
  );
  return { ...item };
};

export default connect(mapStateToProps)(ProjectWrapper);

ProjectWrapper.propTypes = {
  id: PropTypes.string.isRequired,
};
