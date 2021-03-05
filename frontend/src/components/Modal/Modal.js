import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import modalTransition from "./CSSTransition/ModalTransition.module.css";
import overlayTransition from "./CSSTransition/OverlayTransition.module.css";

import style from "./Modal.module.css";

const Modal = () => {
  // const Modal = ({ children, openModal, toggleModal, onSubmit }) => {
  //       в компоненті, який викликає модальне вікно потрібно прописати:
  const [openModal, setOpenModal] = useState(false);
  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  //     та передати openModal, toggleModal

  //     також потрібно передати onSubmit, де буде реалізована логіка, яка має виконуватись при натисканні на клавішу Готово, та очищення форми
  const onSubmit = (e) => {
    let example = false;
    e.preventDefault();
    return example;
  };

  //     children - сама форма

  useEffect(() => {
    openModal && addListener();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModal]);
    
  const confirmAction = (e) => {
    const result = onSubmit(e);
    result && closeModal();
  };
  const closeModal = () => {
    removeListener();
    toggleModal();
    };
       const handleKeyDown = (e) => {
    // console.log("handleKeyDown e", e);
    if (e.code === "Escape") {
      closeModal();
    }
    return
  };
  const addListener = () => {
    window.addEventListener("keydown", handleKeyDown);
  };
  const removeListener = () => {
    window.removeEventListener("keydown", handleKeyDown);
  };

  return (
    <>
      {/* видалити */}
      <button type="button" onClick={toggleModal}>
        Modal
      </button>
      {/* ==================================== */}
      <CSSTransition
        in={openModal}
        timeout={400}
        classNames={modalTransition}
        unmountOnExit
      >
        {(stage) => (
          <div className={style.modal__wrapper}>
            <CSSTransition
              in={stage === "entered"}
              timeout={200}
              classNames={overlayTransition}
              mountOnEnter
              unmountOnExit
            >
              <div onClick={closeModal} className={style.modal__overlay}></div>
            </CSSTransition>

            <div className={style.modal__sidebar}>
              <button onClick={closeModal} className={style.button__close} />
              {/* {children} */}

              <div className={style.button__wrapper}>
                <button onClick={confirmAction} className={style.button__ready}>
                  Готово
                </button>
                <button onClick={closeModal} className={style.button__cancel}>
                  Відміна
                </button>
              </div>
            </div>
          </div>
        )}
      </CSSTransition>
    </>
  );
};

export default Modal;
