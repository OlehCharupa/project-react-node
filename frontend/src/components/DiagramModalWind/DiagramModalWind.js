import React, { useEffect } from "react"
import Diagram from "../Diagram/Diagram"
import style from './DiagramModalWind.module.css'
const DiagramModalWind = ({ isModal, setIsModal }) => {
    const keyEsc = (e) => {
        if (e.code === "Escape") {
            closeModal();
        }
    }
    useEffect(() => {
        window.addEventListener("keydown", keyEsc)

    }, []);

    const closeModal = () => {
        window.removeEventListener("keydown", keyEsc)
        setIsModal(false)
    }


    return (

        <div className={isModal ? style.modalOverlay__open : style.modalOverlay__close}>
            <div className={style.modalWindow} >
                <div className={style.body}>
                    <button className={style.modal__close} onClick={() => closeModal()}>x</button>

                    <Diagram />
                </div>
            </div>
        </div >
    )

}

export default DiagramModalWind