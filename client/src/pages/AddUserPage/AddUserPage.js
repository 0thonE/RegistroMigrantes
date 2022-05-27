import React, { useReducer } from 'react'
import {
  Alert,
  Button,
  Card,
  Container,
  Form,
  Spinner,
} from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const roles = [{ value: '', text: 'Selecciona un rol...' }, 'Admin', 'Analista', 'Voluntario'];

const loginReducer = (state, action) => {
  switch (action.type) {
    case 'field': {
      return {
        ...state,
        [action.fieldName]: action.payload,
      };
    }
    case 'reset': {
      return {
        ...state,
        laoding: false,
        success: false,
        error: ''
      }
    }
    case 'adding-user': {
      return {
        ...state,
        isLoading: true,
        success: false,
        error: '',
      }
    }
    case 'add-user-success': {
      return {
        ...state,
        isLoading: false,
        success: true,
        error: '',
      }
    }
    case 'add-user-error': {
      return {
        ...state,
        isLoading: false,
        success: false,
        error: action.error
      }
    }
    default:
      return state
  }
}

const initialState = {
  email: '',
  role: '',
  error: '',
  isLoading: false,
}

const AddUserPage = () => {
  const [state, dispatch] = useReducer(loginReducer, initialState);
  const { addUser } = useAuth();
  const navigate = useNavigate();
  let org = 'FM4'


  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'adding-user' });
    addUser(state.email, state.role)
      .then(() => {
        dispatch({ type: 'add-user-success' });
        setTimeout(() => {
          navigate('/users')
        }, 4000);
      })
      .catch((err) => {
        let messageError = 'No se pudo crear usuario'
        if (err instanceof Error && err.message?.includes('email-already-in-use'))
          messageError += `, ya existe el usuario ${state.email}`
        dispatch({ type: 'add-user-error', error: messageError });
      })

  }

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '90vh' }}>

      <div className="w-100" style={{ maxWidth: '400px' }}>
        <Card>
          <Card.Body>
            <h4 className="text-center mb-1 ">{org}</h4>
            <h2 className="text-center mb-4">Nuevo Usuario</h2>
            {state.error && <Alert variant="danger" dismissible onClose={() => dispatch({ type: 'reset' })}>{state.error}</Alert>}
            {state.success && <Alert variant="success">Se ha agregado al nuevo usuario, debera revisar su correo para configurar su contraseña</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email" className="mb-3">
                <Form.Label>Correo</Form.Label>
                <Form.Control type="email" required value={state.email} placeholder='Correo del nuevo usuario'
                  onChange={({ target }) => dispatch({ type: 'field', fieldName: 'email', payload: target.value })} />
              </Form.Group>
              <Form.Group id="role" className="mb-3">
                <Form.Label>Rol</Form.Label>
                <Form.Select required onChange={({ target }) => dispatch({ type: 'field', fieldName: 'role', payload: target.value })} >
                  {roles.map((role, indx) => {
                    if (typeof role === 'string')
                      return <option key={`${role}-${indx}`} value={role}>{role}</option>
                    return <option key={`${role.value}-${indx}`} value={role.value}>{role.text}</option>
                  })}
                </Form.Select>
              </Form.Group>
              {state.role?.toLowerCase() === 'admin' ?
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  {console.log('state.role', state.role)}
                  <Form.Check type="checkbox" required label="Confirma el rol de admin" />
                </Form.Group> : null}

              <Button className='loadable-button w-100 mt-4' type="submit" disabled={state.isLoading || state.error} variant={'primary'}>
                {!state.isLoading ? 'Crear Usuario' :
                  <>
                    <span className='button-text'>
                      Creando Usuario
                    </span>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  </>}
              </Button>
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

export default AddUserPage