import React from 'react';
import signIn from './SignIn.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import * as Yup from "yup";
import { NavLink } from 'react-router-dom';
import { logIn } from '../../redux/operations/authOperations.js';
const SignIn = () => {
    const dispatch = useDispatch()
    const errorState = useSelector(state => state.auth.error.message);

    const SigninSchema = Yup.object().shape({
        email: Yup.string()
            .email('Неправильна електронна адреса')
            .required("Обов'язковий"),
        password: Yup.string()
            .min(6, "Занадто короткий! Мінімум 6")
            .max(20, 'Макс 20')
            .required("Обов'язковий"),
    });

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
                        if (!!(errorState)) {
                            setTimeout(() => {
                                setSubmitting(false);
                            }, 500)
                        }
                        dispatch(logIn(values));


                    }}
                >
                    {({ errors, touched }) => (
                        <Form className={signIn.form__registr}>
                            <div className={signIn.form__item}>
                                <Field className={signIn.input} name="email" type="email" id='email' placeholder="Email" />
                                {errors.email && touched.email ? (
                                    <label className={signIn.labelError} htmlFor='email' >{errors.email}</label>
                                ) : (!!(errorState.indexOf('403')+1) ? <label className={signIn.labelError} htmlFor='email' >Ви ввели неправильно електронну адресу або пароль</label>
                                    : (<label className={signIn.label} htmlFor='email' >Електронна пошта*</label>))}
                            </div>

                            <div className={signIn.form__item}>
                                <Field name="password" type="password" id='pass' className={signIn.input} placeholder="Password" />
                                {errors.password && touched.password ? (
                                    <label className={signIn.labelError} htmlFor='pass' >{errors.password}</label>
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