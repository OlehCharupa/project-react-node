import React, { useState } from "react";
import styles from "./CreateProject.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import projectsOperations from "../../redux/operations/projectsOperations";

import { modalToggle } from "../../redux/actions/modalAction";

const CreateProject = () => {
  const SignupSchema = Yup.object().shape({
    projectName: Yup.string().min(1).required("Будь ласка, введіть назву."),
    description: Yup.string().min(1).required("Будь ласка, додайте опис."),
  });

  const isModalOpen = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const toggleModal = () => {
    dispatch(modalToggle(!isModalOpen));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.form_title}>Створення проекту</h2>
      <Formik
        initialValues={{
          projectName: "",
          description: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(value) => {
          toggleModal();
          dispatch(projectsOperations.addProject(value));
        }}
      >
        {({ errors, touched }) => (
          <Form className={styles.neon_border}>
            <div className={styles.form_item}>
              <Field
                name="projectName"
                placeholder=" "
                id="projectName"
                className={styles.input}
              />
              <label className={styles.label} htmlFor="projectName">
                Назва проекту
              </label>
              {errors.projectName && touched.projectName ? (
                <div className={styles.errorDiv}>{errors.projectName}</div>
              ) : null}
            </div>

            <div className={styles.form_item}>
              <Field
                name="description"
                placeholder=" "
                id="description"
                className={styles.input}
              />
              <label className={styles.label} htmlFor="description">
                Опис
              </label>
              {errors.description && touched.description ? (
                <div className={styles.errorDiv}>{errors.description}</div>
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

export default CreateProject;
