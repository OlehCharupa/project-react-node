import React, { useState } from "react"
import DiagramModalWind from "../DiagramModalWind/DiagramModalWind"
import styles from './Index.module.css'

const Index = () => {
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

export default Index