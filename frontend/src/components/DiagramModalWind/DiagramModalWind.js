import { useState } from "react"
import Diagram from "../Diagram/Diagram"

const DiagramModalWind = ({ isModal, setIsModal }) => {
    // const [isModal, setIsModal] = useState(false) - добавить в родительский документ, и передать пропы isModal, setIsModal
    useEffect(() => {
        window.addEventListener("keydown", keyEsc)
    }, []);
    const keyEsc = (e) => {
        if (e.code === "Escape") {
            closeModal();
        }
    }
    const closeModal = () => {
        window.removeEventListener("keydown", keyEsc)
        setIsModal(false)
    }

    return (
        <div className={`modalOverlay ${isModal ? "open" : "close"}`}>
            <div className="modalWindow">
                <button className="modal__close" onClick={closeModal()}>x</button>
                <hr />
                <Diagram />
            </div>
        </div>
    )

}

export default DiagramModalWind