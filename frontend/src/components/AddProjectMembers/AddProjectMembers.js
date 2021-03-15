import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./AddProjectMembers.module.css";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";

import { modalToggle } from "../../redux/actions/modalAction";
import {projectsSelector} from "../../redux/selectors/projects-selectors";
import {getUserEmail} from "../../redux/selectors/authSelectors";
import projectsOperations from "../../redux/operations/projectsOperations";


// TODO: 1) Вытянуть селектор редакс состояния с участниками проекта и текущего юзера

const reduxProjectMembers = [
  "asfaasf@a.com",
  "asfasfsaf@a.com",
  "asfasdfasfsaf@a.com",
]; // Заглушка для map

const AddProjectMembers = () => {
  const location = useLocation();
  let projectId;

  useEffect(() => {
    projectId = location.pathname.substr(10);
  });

  const SignupSchema = Yup.object().shape({
    email: Yup.string()
    .email("Введіть існуючий e-mail.")
    .required("Будь ласка, введіть e-mail користувача.")
    .test(
      "includes",
      "Користувач вже є учасником проекту.",
      function (value) {
        const { path, createError } = this;
        if (reduxProjectMembers.includes(value) || currentUser === value) {
          console.log(reduxProjectMembers.includes(value));
            return createError({
              path,
              message: "Користувач вже є учасником проекту.",
            });
          }
          return true;
        }
      ),
    });
    
    const usersProjects = useSelector(state => projectsSelector(state)); // масив проэктов
    const currentUser = useSelector(state=> getUserEmail(state)); // текущий юзера
    const currentProject = usersProjects.items.find(project => project.id === projectId);
    const currentProjectUsers = currentProject.members
    
  const isModalOpen = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const toggleModal = () => {
    dispatch(modalToggle(!isModalOpen));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.form_title}>Додати людей</h2>
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(value) => {
          toggleModal();
          dispatch(projectsOperations.addProjectMember(projectId, value));
        }}
      >
        {({ errors, touched }) => (
          <Form className={styles.neon_border}>
            <div className={styles.form_item}>
              <Field
                name="email"
                placeholder=" "
                id="email"
                type="email"
                className={styles.input}
              />
              <label className={styles.label} htmlFor="email">
                Введіть e-mail
              </label>
              {errors.email && touched.email ? (
                <div className={styles.errorDiv}>{errors.email}</div>
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
      <div className={styles.members_list}>
        <h3>Додані користувачі:</h3>
        <ul>
          {/* <li className={styles.members_item}>
            <p>{currentUser}</p>
          </li> */}
          {currentProjectUsers.map((email) => (
            <li key={uuidv4()} className={styles.members_item}>
              <p>{email}</p>
              {/* <button
                onClick={() => console.log(`btn`)}
                data-email={email}
                className={styles.delete_button}
              ></button> */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddProjectMembers;
