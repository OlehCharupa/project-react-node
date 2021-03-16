import React, { useState } from "react"
import { useSelector } from "react-redux"
import { sprintDurationSelector } from "../../redux/selectors/diagramSelectors"
import DiagramModalWind from "../DiagramModalWind/DiagramModalWind"
import styles from './DiagramBtn.module.css'

const DiagramBtn = () => {
    const [isModal, setIsModal] = useState(false)
    const tasks = useSelector(state => sprintDurationSelector(state))
    return (
        <>
            { tasks > 2 && <button
                type="button"
                className={styles.graphicBtn}
                onClick={() => setIsModal(true)}
            ></button>}
            <DiagramModalWind isModal={isModal} setIsModal={() => setIsModal(false)} />
        </>
    )

}

export default DiagramBtn