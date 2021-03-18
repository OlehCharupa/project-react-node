import React, {useEffect} from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./AddProjectMembers.module.css";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";

import { modalToggle } from "../../redux/actions/modalAction";
import { projectsSelector } from "../../redux/selectors/projects-selectors";
import { getUserEmail } from "../../redux/selectors/authSelectors";
import projectsOperations from "../../redux/operations/projectsOperations";

const AddProjectMembers = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  let projectId = location.pathname.substr(10);

  useEffect(() => {
    dispatch(projectsOperations.fetchProjects());
  }, [dispatch]);

  const usersProjects = useSelector((state) => projectsSelector(state));
  const currentUser = useSelector((state) => getUserEmail(state));
  const currentProject = usersProjects.items.find(
    (project) => project._id === projectId
  );
  const currentProjectUsers = currentProject.members;

  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email("Введіть існуючий e-mail.")
      .required("Будь ласка, введіть e-mail користувача.")
      .test(
        "includes",
        "Користувач вже є учасником проекту.",
        function (value) {
          const { path, createError } = this;
          if (currentProjectUsers.includes(value) || currentUser === value) {
            console.log(currentProjectUsers.includes(value));
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
          console.log(`submit`);
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
            <div className={styles.members_list}>
              <h3>Додані користувачі:</h3>
              <ul>
                {currentProjectUsers.map((email) => (
                  <li key={uuidv4()} className={styles.members_item}>
                    <p>{email}</p>
                  </li>
                ))}
              </ul>
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

export default AddProjectMembers;
