import React, { useEffect, useState } from 'react';
import {
  Alert,
  Col,
  Container,
  Form,
  FormControl,
  InputGroup,
  Row,
} from 'react-bootstrap';
import AddIcon from './AddIcon';
import RemoveItemBasket from './RemoveItemBasket';

const Todo = () => {
  const [deneme, setDeneme] = useState({
    field: '',
    checked: false,
  });
  const [todoGoals, setTodoGoals] = useState(() =>
    getLocalStorage('userTodoList', [])
  );

  useEffect(() => {
    setLocalStorage('userTodoList', todoGoals);
  }, [todoGoals]);

  function setLocalStorage(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      // catch possible errors:
      // https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
    }
  }

  function getLocalStorage(key, initialValue) {
    try {
      const value = window.localStorage.getItem(key);
      return value ? JSON.parse(value) : initialValue;
    } catch (e) {
      // if error, return initial value
      return initialValue;
    }
  }

  const addGoalToLocalStorage = (e) => {
    setTodoGoals((prevTodoGoals) => [...prevTodoGoals, deneme]);
    setDeneme({ field: '' });
  };

  const handleKeyPress = (e) => {
    if (e.code === 'Enter') {
      addGoalToLocalStorage(e.target.value);
    }
  };

  const removeFromBasket = (e) => {
    let someArray = todoGoals;
    let newtodoGoals = someArray.filter((el) => someArray.indexOf(el) !== e);
    localStorage.removeItem('userTodoList');
    setTodoGoals(newtodoGoals);
  };
  //TODO remove'da aynı değer olunca sıkıntı çıkartıyor

  const myFunction = (index) => {
    let someArray = todoGoals;
    let toUpdateCheckbox = someArray[index];
    if (toUpdateCheckbox.checked === false) {
      toUpdateCheckbox = {
        field: someArray[index].field,
        checked: true,
      };
    } else if (toUpdateCheckbox.checked === true) {
      toUpdateCheckbox = {
        field: someArray[index].field,
        checked: false,
      };
    }
    someArray[index] = toUpdateCheckbox;
    localStorage.removeItem('userTodoList');
    handleNewArray(someArray);
  };

  const handleNewArray = (e) => {
    setTodoGoals((prevTodoGoals) => [...prevTodoGoals]);
    setDeneme({ field: '' });
  };

  const todoGoal = () => (
    <>
      {todoGoals.map((todo, index) => (
        <InputGroup
          className="mb-3"
          key={index}
          style={{ textDecoration: todo.checked ? 'line-through' : 'none' }}
        >
          <InputGroup.Prepend>
            <InputGroup.Checkbox
              id={index}
              aria-label="Checkbox for following text input"
              onChange={() => myFunction(index)}
              checked={todo.checked}
            />
          </InputGroup.Prepend>
          <FormControl
            aria-label="Text input with checkbox"
            value={todo.field}
            disabled
          />
          <InputGroup.Append>
            <RemoveItemBasket
              removeFromBasket={removeFromBasket}
              index={index}
            />
          </InputGroup.Append>
        </InputGroup>
      ))}

      {todoGoals.length >= 5 ? (
        <Alert variant="secondary">
          En fazla 5 hedef belirleyebilirsiniz...
        </Alert>
      ) : (
        <div>
          <Form.Group>
            <InputGroup className="mb-3">
              <Form.Control
                type="text"
                placeholder="Hedef belirleyiniz..."
                value={deneme.field}
                onChange={(event) =>
                  setDeneme({ field: event.target.value, checked: false })
                }
                onKeyPress={(event) => handleKeyPress(event)}
                className="disabled"
              />
              <InputGroup.Append>
                <AddIcon addButton={addGoalToLocalStorage} />
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>
        </div>
      )}
    </>
  );

  return (
    <Container>
      <Row>
        <Col>
          <h4>Hedefler</h4>
          <hr className="dropdown-divider" />
        </Col>
      </Row>
      <Row>
        <Col>{todoGoal()}</Col>
      </Row>
    </Container>
  );
};

export default Todo;
