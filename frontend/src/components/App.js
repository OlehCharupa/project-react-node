import styles from "./App.module.css";
import Container from "./Container/Container";
import Header from "./Header/Header";
import SignUp from '../pages/Registration-page';
import SignIn from '../pages/Login-page/index';

function App() {
  return (
    <Container>
      <Header />
      {/* <h1>hello</h1> */}
      {/* <SignUp /> */}
      <SignIn />
    </Container>
  );
}

export default App;
