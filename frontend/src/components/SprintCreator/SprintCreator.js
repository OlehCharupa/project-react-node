import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./SprintCreator.module.css";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import moment from "moment";
import momentDays from "moment-business-days";
import { registerLocale } from "react-datepicker";
import uk from "date-fns/locale/uk";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { modalToggle } from "../../redux/actions/modalAction";

import sprintOperations from "../../redux/operations/sprintsOperations";

import "react-datepicker/dist/react-datepicker.css";
import "./bashStyles.css";

const SprintCreator = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [hidePastDays, setHidePastDays] = useState(false);
  registerLocale("uk", uk);

  const location = useLocation();
  let projectId;

  useEffect(() => {
    projectId = location.pathname.substr(10);
  });

  const pastDaysToggle = () => {
    setHidePastDays((state) => !state);
  };

  const isModalOpen = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const toggleModal = () => {
    dispatch(modalToggle(!isModalOpen));
  };

  const CreateSchema = Yup.object().shape({
    sprintName: Yup.string()
      .min(2, "Будь ласка, введіть коректну назву спринту.")
      .max(30, "Будь ласка, введіть коректну назву спринту.")
      .required("Будь ласка, введіть назву спринту."),
    duration: Yup.number()
      .typeError(`Введите число!`)
      .positive("Число должно быть положительным!")
      .integer("Число должно быть целым!")
      .min(1, "Будь ласка, оберіть тривалість спринта.")
      .max(30, "Too Long!")
      .required("Будь ласка, оберіть тривалість спринта."),
  });

  const ifIsWeekEnd = (date) => {
    const dateToFormat = new Date(date);
    const day = dateToFormat.getDay();
    if (day === 6) {
      return date + 172800000;
    } else if (day === 0) {
      return date + 86400000;
    }
    return date;
  };

  const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Створення спринта</h1>
      <Formik
        initialValues={{
          sprintName: "",
          duration: "",
        }}
        validationSchema={CreateSchema}
        onSubmit={({ sprintName, duration }) => {
          const StartDate = new Date(startDate);
          const formatedStartDate = moment(StartDate, "DD-MM-YYYY").format(
            "DD-MM-YYYY"
          );

          const endDate = momentDays(
            formatedStartDate,
            "DD-MM-YYYY"
          ).businessAdd(duration - 1)._d;
          const formatedEndDate = moment(endDate, "DD.MM.YYYY").format(
            "DD.MM.YYYY"
          );

          const reqBody = {
            projectId,
            title: sprintName,
            startDate: formatedStartDate,
            endDate: formatedEndDate,
            duration: Number(duration),
          };

          dispatch(sprintOperations.addSprint(reqBody));

          setStartDate(Date.now());
          toggleModal();
        }}
      >
        {({ errors, touched }) => (
          <Form className={styles.neon_border}>
            <div className={styles.formItem}>
              <Field
                className={styles.input}
                id="sprintName"
                name="sprintName"
                placeholder=" "
              />
              <label className={styles.label} htmlFor="sprintName">
                Назва спринта
              </label>
              {touched.sprintName && errors.sprintName && (
                <div className={styles.errorDiv}>{errors.sprintName}</div>
              )}
            </div>
            <div className={(styles.formItem, styles.checkbox_container)}>
              <input
                id="checkbox"
                type="checkbox"
                name="checkbox"
                onChange={pastDaysToggle}
                className={styles.checkbox}
              />
              <label
                htmlFor="checkbox"
                className={styles.checkbox_span}
              ></label>
              <label htmlFor="checkbox" className={styles.checkbox_label}>
                Попередні дні
              </label>
            </div>
            <p className={styles.text}>Дата закінчення</p>

            <div className={styles.flex_wrapper}>
              <DatePicker
                locale="uk"
                showMonthPicker
                dateFormat="dd/MM/yyyy"
                placeholderText="Дата початку"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                // selected={ifIsWeekEnd(startDate)}
                filterDate={isWeekday}
                minDate={!hidePastDays && moment().toDate()}
                className={styles.date_picker}
              />
              <div
                className={`${styles.formItem}  ${styles.duration_container}`}
              >
                <Field
                  className={styles.input}
                  id="duration"
                  name="duration"
                  placeholder=" "
                />
                <label className={styles.label} htmlFor="duration">
                  Тривалість
                </label>
                {touched.duration && errors.duration && (
                  <div className={styles.errorDiv}>{errors.duration}</div>
                )}
              </div>
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

export default SprintCreator;
