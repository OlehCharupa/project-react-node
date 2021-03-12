import React, { useState } from "react";
import styles from "./TaskCreator.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { modalToggle } from "../../redux/actions/modalAction";

//  2) Вытянуть операцию на создание проекта

const TaskCreator = () => {
  const SignupSchema = Yup.object().shape({
    taskName: Yup.string().min(1).required("Будь ласка, введіть назву."),
    duration: Yup.number().typeError('Значення має бути числом.').min(1).required("Будь ласка, введіть час."),
  });

  const isModalOpen = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const toggleModal = () => {
    dispatch(modalToggle(!isModalOpen));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.form_title}>Створення задачі</h2>
      <Formik
        initialValues={{
          taskName: "",
          duration: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(value) => {
          console.log(value);
          toggleModal();
          // Отдаём аргумент в операцию добавления
        }}
      >
        {({ errors, touched }) => (
          <Form className={styles.neon_border}>
            <div className={styles.form_item}>
              <Field
                name="taskName"
                placeholder=" "
                id="taskName"
                className={styles.input}
              />
              <label className={styles.label} htmlFor="taskName">
                Назва задачі
              </label>
              {errors.taskName && touched.taskName ? (
                <div className={styles.errorDiv}>{errors.taskName}</div>
              ) : null}
            </div>

            <div className={styles.form_item}>
              <Field
                name="duration"
                placeholder=" "
                id="duration"
                className={styles.input}
              />
              <label className={styles.label} htmlFor="duration">
                Заплановано годин
              </label>
              {errors.duration && touched.duration ? (
                <div className={styles.errorDiv}>{errors.duration}</div>
              ) : null}
            </div>
            <div className={styles.button__wrapper}>
              <button type="submit" className={styles.button__ready}>
                Готово
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TaskCreator;
