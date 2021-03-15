import React, { useState } from "react"
import DiagramModalWind from "../DiagramModalWind/DiagramModalWind"
import styles from './DiagramBtn.module.css'

const DiagramBtn = () => {
    const [isModal, setIsModal] = useState(false)

    return (
        <>
            <button
                type="button"
                className={styles.graphicBtn}
                onClick={() => setIsModal(true)}
            ></button>
            <DiagramModalWind isModal={isModal} setIsModal={() => setIsModal(false)} />
        </>
    )

}

export default DiagramBtn