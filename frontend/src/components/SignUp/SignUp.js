import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import signUp from './SignUp.module.css';
import { useHistory } from "react-router-dom";
import { Formik, Field, Form } from 'formik';
import * as Yup from "yup";
import { NavLink } from 'react-router-dom';
import { register } from '../../redux/operations/authOperations.js';
import authAction from "../../redux/actions/authAction";

const SignUp = () => {
    // console.clear();

    const dispatch = useDispatch();
    const history = useHistory();
    const errorState = useSelector(state => state.auth.error.message);
    // console.log('errorStateError', errorStateError({message: ''}));
    const SignupSchema = Yup.object().shape({
        email: Yup.string()
            .email('Неправильна електронна адреса')
            .required("Обов'язковий"),
        password: Yup.string()
            .min(6, "Занадто короткий! Мінімум 6")
            .max(20, 'Макс 20')
            .required("Обов'язковий"),
        repeatPassword: Yup.string()
            .required("Обов'язковий")
            .oneOf([Yup.ref("password"), null], "Паролі не збігаються"),

    });
    // const initialErrorState = ({message: ''});

    // console.log('errorState', error.error(initialErrorState));
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
                    onSubmit={async(values, { setSubmitting, setErrors, resetForm }) => {

                            if(!!errorState.indexOf('Request failed with status code 409')){
                                setTimeout(() => {
                                  setErrors({ email: 'Таку електронну адресу вже зареєстровано!' })
                                    setSubmitting(false);
                                }, 500)
                            }else{
                                setTimeout(() => {
                                    history.push('/login');
                                    resetForm();
                                    setSubmitting(false);
                                }, 500)
                            }
                        dispatch(authAction.registerError({ message: '' }))
                        dispatch(register(values));
                    }}
                >
                    {({ errors, touched, values, handleBlur }) => (
                        <Form className={signUp.form__registr}>
                            <div className={signUp.form__item}>
                                <Field className={signUp.input} name="email" type="email" id='email' placeholder="Електронна пошта*" value={values.email || ''} onBlur={handleBlur} required />

                                {errors.email && touched.email ? (
                                    <label className={signUp.labelError} htmlFor='email' >{errors.email}</label>)
                                    : <label className={signUp.label} htmlFor='email' >Електронна пошта*</label>}
                            </div>

                            <div className={signUp.form__item}>
                                <Field name="password" type="password" id='pass' className={signUp.input} placeholder="Пароль*" value={values.password || ''} required />
                                {errors.password && touched.password ? (
                                    <label className={signUp.labelError} htmlFor='pass' >{errors.password}</label>
                                ) : (<label htmlFor='pass' className={signUp.label} >Пароль*</label>)}
                            </div>

                            <div className={signUp.form__item}>
                                <Field name="repeatPassword" type="password" id='repeatPass' className={signUp.input} placeholder="Пароль*" value={values.repeatPassword || ''} required />
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