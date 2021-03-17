import React from 'react';
import style from './BgImage.module.css';
import { useLocation } from "react-router-dom";


const BgImage = () => {
    const location = useLocation();
 
    return (
        <>
            <div className={(location.pathname === "/login") ? (style.leftLogin) : (style.leftImg)}></div>
            <div className={(location.pathname === "/login") ? (style.leftLoginOrabge) : (style.leftImgOrabge)}></div>
            <div className={style.rightImg}></div>
        </>
    );
};

export default BgImage;