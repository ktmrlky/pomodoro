import { Col, Container, Row } from 'react-bootstrap';
import './App.css';
import Counter from './Components/Counter';
import Progress from './Components/Progress';
import Todo from './Components/Todo';

function App() {
  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center mb-4">
        <Col xs lg="10" className="pl-4 pr-4">
          <Progress />
        </Col>
      </Row>

      <Row className="justify-content-md-center">
        <Col xs lg="5">
          <Todo />
        </Col>
        <Col xs lg="5" className="d-flex justify-content-center">
          <Counter />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
