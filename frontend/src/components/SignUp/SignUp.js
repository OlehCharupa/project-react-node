import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import signUp from './SignUp.module.css';
// import BgImage from '../BgImage/BgImage';
import { Formik, Field, Form } from 'formik';
import * as Yup from "yup";
import { NavLink } from 'react-router-dom';
import { register } from '../../redux/operations/authOperations.js';
// import { Registration } from '../../redux/operations/signUpOperation.js';


const SignUp = () => {
    const dispatch = useDispatch()
    const SignupSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email')
            .required('Required'),
        password: Yup.string()
            .min(6, "Too Short! Min 6")
            .max(20, 'Max 20')
            .required('Required'),
        repeatPassword: Yup.mixed()
            .test('match',
                "Passwords do not match",
                function () {
                    return this.parent.password === this.parent.repeatPassword;
                }
            )
            .required('Required'),

    });
    const regState = {
        email: '',
        password: '',
        // repeatPassword: '',
    }
    const [regForm, setRegState] = useState(regState);
    console.log('operation', register());

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
                        console.log('dispathOp', dispatch(register(values)));

                        setTimeout(() => {
                            setRegState(values)
                            console.log('regform', regForm);
                            console.log('values', values);
                            // register(()=>values);
                            // console.log('dispath', register(regForm));
                            // console.log('operation', register());
                            // console.log('1', register(regForm));
                            // console.log('dispath', register.register(regForm));
                            // register.register(regForm);
                            dispatch(register(values));
                            setSubmitting(false);
                        }, 500)
                    }}
                >
                    {({ errors, touched }) => (
                        <Form className={signUp.form__registr}>
                            <div className={signUp.form__item}>
                                <Field className={signUp.input} name="email" type="email" id='email' placeholder="Email" />

                                {errors.email && touched.email ? (
                                    <label className={signUp.labelError} htmlFor='email' >{errors.email}</label>
                                ) : <label className={signUp.label} htmlFor='email' >Email*</label>}
                            </div>

                            <div className={signUp.form__item}>
                                <Field name="password" type="password" id='pass' className={signUp.input} placeholder="Password" />
                                {errors.password && touched.password ? (
                                    <label className={signUp.labelError} htmlFor='pass' >{errors.password}</label>
                                ) : (<label htmlFor='pass' className={signUp.label} >Password*</label>)}
                            </div>

                            <div className={signUp.form__item}>
                                <Field name="repeatPassword" type="password" id='repeatPass' className={signUp.input} placeholder="repeatPassword" />
                                {errors.repeatPassword && touched.repeatPassword ? (
                                    <label className={signUp.labelError} htmlFor='repeatPass'>{errors.repeatPassword}</label>
                                ) : <label htmlFor='repeatPass' className={signUp.label} >Password*</label>}
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