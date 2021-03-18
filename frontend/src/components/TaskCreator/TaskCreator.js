import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./TaskCreator.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import taskOperations from '../../redux/operations/tasksOperations'
import { modalToggle } from "../../redux/actions/modalAction";

const TaskCreator = () => {
  const location = useLocation();
  let sprintId=location.pathname.substr(35);

  // useEffect(() => {
  //   sprintId = location.pathname.substr(35);
  // }, []);

  const SignupSchema = Yup.object().shape({
    title: Yup.string().min(1).required("Будь ласка, введіть назву."),
    hoursPlanned: Yup.number().typeError('Значення має бути числом.').min(1).required("Будь ласка, введіть час."),
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
          title: "",
          hoursPlanned: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          const {title, hoursPlanned} = values;
          dispatch(taskOperations.addTask({sprintId, title, hoursPlanned: Number(...hoursPlanned)}))
          toggleModal();
        }}
      >
        {({ errors, touched }) => (
          <Form className={styles.neon_border}>
            <div className={styles.form_item}>
              <Field
                name="title"
                placeholder=" "
                id="title"
                className={styles.input}
              />
              <label className={styles.label} htmlFor="title">
                Назва задачі
              </label>
              {errors.title && touched.title ? (
                <div className={styles.errorDiv}>{errors.title}</div>
              ) : null}
            </div>

            <div className={styles.form_item}>
              <Field
                name="hoursPlanned"
                placeholder=" "
                id="hoursPlanned"
                className={styles.input}
              />
              <label className={styles.label} htmlFor="hoursPlanned">
                Заплановано годин
              </label>
              {errors.hoursPlanned && touched.hoursPlanned ? (
                <div className={styles.errorDiv}>{errors.hoursPlanned}</div>
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
