import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./AddProjectMembers.module.css";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";

import { modalToggle } from "../../redux/actions/modalAction";

// TODO: 1) Вытянуть селектор редакс состояния с участниками проекта и текущего юзера
//  2) Вытянуть операции на добавление и удаление пользователя проекта

const reduxProjectMembers = [
  "asfaasf@a.com",
  "asfasfsaf@a.com",
  "asfasdfasfsaf@a.com",
]; // Заглушка для map
const currentUser = "monkeyCoder@a.com"; // текущий юзера

const AddProjectMembers = () => {
  const SignupSchema = Yup.object().shape({
    addMember: Yup.string()
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
          addMember: "",
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
                name="addMember"
                placeholder=" "
                id="addMember"
                className={styles.input}
              />
              <label className={styles.label} htmlFor="addMember">
                Введіть e-mail
              </label>
              {errors.addMember && touched.addMember ? (
                <div className={styles.errorDiv}>{errors.addMember}</div>
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
          <li className={styles.members_item}>
            <p>{currentUser}</p>
          </li>
          {reduxProjectMembers.map((email) => (
            <li key={uuidv4()} className={styles.members_item}>
              <p>{email}</p>
              <button
                onClick={() => console.log(`btn`)}
                data-email={email}
                className={styles.delete_button}
              ></button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddProjectMembers;
