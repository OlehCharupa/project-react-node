import React, { useState } from "react";
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
    setModal(!isModalOpen);
    dispatch(modalToggle(!isModalOpen));
  };

  const [modal, setModal] = useState(isModalOpen);

  return (
    <div>
      {modal && (
        <Modal
          children={<AddProjectMembers />}
          isModalOpen={isModalOpen}
          toggleModal={toggleModal}
        />
      )}
      <div className={style.addPeople}>
        <img src={add} style={{ width: "20px", marginRight: "10px" }} />
        <button
          style={{ backgroundColor: "transparent", cursor: "pointer" }}
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
;