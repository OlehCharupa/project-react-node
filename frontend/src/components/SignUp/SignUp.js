import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import signUp from './SignUp.module.css';
import { useHistory } from "react-router-dom";
import { Formik, Field, Form } from 'formik';
import * as Yup from "yup";
import { NavLink } from 'react-router-dom';
import { register } from '../../redux/operations/authOperations.js';

const SignUp = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    const errorState = useSelector(state => state.auth.error.message);

    const SignupSchema = Yup.object().shape({
        email: Yup.string()
            .email('Неправильна електронна адреса')
            .required("Обов'язковий"),
        password: Yup.string()
            .min(6, "Занадто короткий! Мінімум 6")
            .max(20, 'Макс 20')
            .required("Обов'язковий"),
        repeatPassword: Yup.mixed()
            .test('Збіг',
                "Паролі не збігаються",
                function () {
                    return this.parent.password === this.parent.repeatPassword;
                }
            )
            .required("Обов'язковий"),

    });
    return (
        <>
            <div className={signUp.registr__block}>
                <h1 className={signUp.form__title}>Реєстрація</h1>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        // same shape as initial values
                        if(!!(errorState)){
                            setTimeout(() => {
                                history.push('/login')
                                setSubmitting(false);
                            }, 500)
                        }   
                        dispatch(register(values));
                        

                    }}
                >
                    {({ errors, touched }) => (
                        <Form className={signUp.form__registr}>
                            <div className={signUp.form__item}>
                                <Field className={signUp.input} name="email" type="email" id='email' placeholder="Електронна пошта*" required/>

                                {errors.email && touched.email ? (
                                    <label className={signUp.labelError} htmlFor='email' >{errors.email}</label>
                                ) : (!!(errorState.indexOf('409')+1)?<label className={signUp.label} htmlFor='email' >Таку електронну адресу вже зареєстровано!</label>
                                : <label className={signUp.label} htmlFor='email' >Електронна пошта*</label>)}
                            </div>

                            <div className={signUp.form__item}>
                                <Field name="password" type="password" id='pass' className={signUp.input} placeholder="Пароль*" required/>
                                {errors.password && touched.password ? (
                                    <label className={signUp.labelError} htmlFor='pass' >{errors.password}</label>
                                ) : (<label htmlFor='pass' className={signUp.label} >Пароль*</label>)}
                            </div>

                            <div className={signUp.form__item}>
                                <Field name="repeatPassword" type="password" id='repeatPass' className={signUp.input} placeholder="Пароль*" required/>
                                {errors.repeatPassword && touched.repeatPassword ? (
                                    <label className={signUp.labelError} htmlFor='repeatPass'>{errors.repeatPassword}</label>
                                ) : <label htmlFor='repeatPass' className={signUp.label} >Пароль*</label>}
                            </div>

                            <button type='submit' className={signUp.btn}>Зареєструватися</button>
                            <p className={signUp.form__text}>Маєте акаунт? <NavLink to="/login" exact className={signUp.form__link} >Увійти</NavLink></p>                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
};

export default SignUp;