import React, { useReducer } from 'react'
import {
  Alert,
  Button,
  Card,
  Container,
  Form,
} from 'react-bootstrap';

import { useAuth } from '../../contexts/AuthContext';

const loginReducer = (state, action) => {
  switch (action.type) {
    case 'field': {
      return {
        ...state,
        [action.fieldName]: action.payload,
      };
    }
    case 'logging': {
      return {
        ...state,
        loading: true,
        error: '',
      }
    }
    case 'login-success': {
      return {
        ...state,
        loading: false,
        error: '',
      }
    }
    case 'login-error': {
      return {
        ...state,
        laoding: false,
        error: action.error
      }
    }

    default:
      return state
  }
}

const initialState = {
  email: '',
  password: '',
  error: '',
  loading: false,
}

const LoginPage = () => {
  const [state, dispatch] = useReducer(loginReducer, initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'logging' });




  }

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}>

      <div className="w-100" style={{ maxWidth: '400px' }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Inicia Sesión</h2>
            {state.error && <Alert variant="danger">{state.error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Correo</Form.Label>
                <Form.Control type="email" required value={state.email} placeholder='email'
                  onChange={({ target }) => dispatch({ type: 'field', fieldName: 'email', payload: target.value })} />
              </Form.Group><br />
              <Form.Group id="password">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" required value={state.password} placeholder='constraseña'
                  onChange={({ target }) => dispatch({ type: 'field', fieldName: 'password', payload: target.value })} />
              </Form.Group><br />
              <Button className='w-100' type="submit" disabled={state.loading} >Inicir sesión</Button>
            </Form>
          </Card.Body >
        </Card >
        {/* <div className="w-100 text-center mt-2">
          Already have an account?Log In
        </div> */}
      </div >
    </Container>
  )
}

export default LoginPage