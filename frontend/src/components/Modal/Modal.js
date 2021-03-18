import React, { useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import modalTransition from "./CSSTransition/ModalTransition.module.css";
import overlayTransition from "./CSSTransition/OverlayTransition.module.css";
import style from "./Modal.module.css";

const Modal = ({ children, isModalOpen, toggleModal }) => {
  const body = document.querySelector("body");

  useEffect(() => {
    isModalOpen && addListener();
    isModalOpen && body.classList.add(style.isOpen);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen]);

  const closeModal = () => {
    removeListener();
    body.classList.remove(style.isOpen);
    toggleModal();
  };
  const handleKeyDown = (e) => {
    if (e.code === "Escape") {
      closeModal();
    }
    return;
  };
  const addListener = () => {
    window.addEventListener("keydown", handleKeyDown);
  };
  const removeListener = () => {
    window.removeEventListener("keydown", handleKeyDown);
  };

  return (
    <>
      <CSSTransition
        in={isModalOpen}
        timeout={400}
        classNames={modalTransition}
        mountOnEnter
        unmountOnExit
      >
        {(stage) => (
          <div className={style.modal__wrapper}>
            <CSSTransition
              in={stage === "entered"}
              timeout={300}
              classNames={overlayTransition}
              mountOnEnter
              unmountOnExit
            >
              <div onClick={closeModal} className={style.modal__overlay}></div>
            </CSSTransition>

            <div className={style.modal__sidebar}>
              <button onClick={closeModal} className={style.button__close} />
              {children}
              <div className={style.button__wrapper}>

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
