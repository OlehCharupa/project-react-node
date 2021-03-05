import styles from "./App.module.css";
import Container from "./Container/Container";
import Header from "./Header/Header";
import Modal from "./Modal/Modal";

function App() {
  return (
    <Container>
      <Header />
      <h1>hello</h1>
      <Modal/>
    </Container>
  );
}

export default App;
