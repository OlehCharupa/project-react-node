import React, { useState } from 'react';
import signIn from './SignIn.module.css';
import { useDispatch } from 'react-redux';
// import BgImage from '../BgImage/BgImage';
import { Formik, Field, Form } from 'formik';
import * as Yup from "yup";
import { NavLink } from 'react-router-dom';
import { logIn } from '../../redux/operations/authOperations.js';

const SignIn = () => {
    const dispatch = useDispatch()
    const SigninSchema = Yup.object().shape({
        email: Yup.string()
            .email('Неправильна електронна адреса')
            .required("Обов'язковий"),
        password: Yup.string()
            .min(6, "Занадто короткий! Мінімум 6")
            .max(20, 'Макс 20')
            .required("Обов'язковий"),
    });
    const regState = {
        email: '',
        password: '',
    }

    return (
        <>

            <div className={signIn.registr__block}>
                <h1 className={signIn.form__title}>Вхід</h1>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    validationSchema={SigninSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        // same shape as initial values
                        setTimeout(() => {
                            dispatch(logIn(values));
                            setSubmitting(false);
                        }, 500)
                    }}
                >
                    {({ errors, touched }) => (
                        <Form className={signIn.form__registr}>
                            <div className={signIn.form__item}>
                                <Field className={signIn.input} name="email" type="email" id='email' placeholder="Email" />
                                {errors.email && touched.email ? (
                                    <label className={signIn.labelError} htmlFor='email' >{errors.email}</label>
                                ) : (<label className={signIn.label} htmlFor='email' >Електронна пошта*</label>)}
                            </div>

                            <div className={signIn.form__item}>
                                <Field name="password" type="password" id='pass' className={signIn.input} placeholder="Password" />
                                {errors.password && touched.password ? (
                                    <label className={signIn.labelError} htmlFor='password' >{errors.password}</label>
                                ) : (<label htmlFor='pass' className={signIn.label} >Пароль*</label>)}
                            </div>
                            <button type='submit' className={signIn.btn}>Увійти</button>
                            <p className={signIn.form__text}>Немає акаунту? <NavLink to="/registration" exact className={signIn.form__link} >Зареєструватись</NavLink></p>                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
};

export default SignIn;