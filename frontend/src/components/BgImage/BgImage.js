import React from 'react';
import style from './BgImage.module.css';


const BgImage = () => {
    return (
        <>
            <div className={style.leftImg}></div>
            <div className={style.leftImgOrabge}></div>
            <div className={style.rightImg}></div>
        </>
    );
};

export default BgImage;