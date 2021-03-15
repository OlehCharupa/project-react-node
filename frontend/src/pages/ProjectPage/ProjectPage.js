import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { allProjectsSelector } from "../../redux/selectors/projects-selectors";
import projectsOperations from "../../redux/operations/projectsOperations";
import ProjectPageItem from "../../components/ProjectPageItem/ProjectPageItem";
import style from "./ProjectPage.module.css";
import container from "../../components/Container/Container.module.css";
import plus from "./images/plus.svg";

import { modalToggle } from "../../redux/actions/modalAction";
import CreateProject from "../../components/CreateProject/CreateProject";
import Modal from "../../components/Modal/Modal";

const ProjectPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(projectsOperations.fetchProjects());
  }, []);

  const isModalOpen = useSelector((state) => state.modal);
  const toggleModal = () => {
    dispatch(modalToggle(!isModalOpen));
  };

  const projects = useSelector((state) => allProjectsSelector(state));

  return (
    <>
      <div className={(container, style.mainPage)}>
        <div>
          <h1 className={style.title}>Проекти</h1>
        </div>
        <div className={style.link}>
          <Modal
            children={<CreateProject />}
            isModalOpen={isModalOpen}
            toggleModal={toggleModal}
          />
          <button className={style.mainplusBtn} style={{width:"44px", height:"44px"}}  type="button" onClick={toggleModal}>
              <img src={plus} style={{width:"44px", height:"44px", margin:'0'}} />
          </button>
          <div className={style.create}>Створити проект</div>
        </div>
      </div>
      {Array.isArray(projects) ? (
        <ul className={style.list}>
          {projects.map((project) => (
            <ProjectPageItem {...project} key={project._id} id={project._id} />
          ))}
        </ul>
      ) : (
        <h2
          style={{
            textAlign: "center",
            fontSize: "24px",
            color: "rgba(24,28,39,0.3)",
          }}
        >
          Ваша колекція проектів порожня, скористайтесь кнопкою "Створити
          проект"
        </h2>
      )}
    </>
  );
};

export default ProjectPage;
