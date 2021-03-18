import React from "react";
import style from "./AddPeopleProjectWrapper.module.css";
import { useSelector, useDispatch } from "react-redux";
import add from "../images/add.svg";

import { modalToggle } from "../../../redux/actions/modalAction";
import Modal from "../../Modal/Modal";
import AddProjectMembers from "../../AddProjectMembers/AddProjectMembers";

const AddPeopleProjectWrapper = () => {
  const dispatch = useDispatch();

  const isModalOpen = useSelector((state) => state.modal);
  const toggleModal = () => {
    dispatch(modalToggle(!isModalOpen));
  };

  return (
    <div>
    
        <Modal
          children={<AddProjectMembers />}
          isModalOpen={isModalOpen}
          toggleModal={toggleModal}
        />
 
      <div className={style.addPeople}>
        <img src={add} alt="add" style={{ width: "20px", marginRight: "10px" }} />
        <button
          style={{ backgroundColor: "transparent" }}
          type="button"
          aria-label="add members"
          onClick={toggleModal}
        >
          <span
            style={{
              color: "#181C27",
              textDecoration: "underline",
              fontFamily: "Montserrat",
              fontStyle: "normal",
              fontWeight: "500",
              fontSize: "18px",
              lineHeight: "22px",
            }}
          >
            Додати людей
          </span>
        </button>
      </div>
    </div>
  );
};

export default AddPeopleProjectWrapper;
