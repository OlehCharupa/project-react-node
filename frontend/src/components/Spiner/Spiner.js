import React from "react";
import { useWindowWidth } from "@react-hook/window-size";
import Loader from "react-loader-spinner";
import style from "./Spiner.module.css";


const Spiner = () => {
    const onlyWidth = useWindowWidth();
    return (
        <Loader
            className={style.loader}
            type="Bars"
            color="#FC842D"
            height={onlyWidth < 768 ? 70 : 150}
            width={onlyWidth < 768 ? 70 : 200}
            timeout={3000}
        />
    );
};

export default Spiner;