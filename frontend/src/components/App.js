import styles from "./App.module.css";
import Container from "../components/Container/Container";
import Header from "./Header/Header";
import ProjectPage from "../pages/ProjectPage/ProjectPage";
import SprintPage from "../pages/SprintPage/SprintPage";

function App() {
  return (
    <Container>
      <Header />
      {/* <ProjectPage /> */}
      <SprintPage />
    </Container>
  );
}

export default App;
