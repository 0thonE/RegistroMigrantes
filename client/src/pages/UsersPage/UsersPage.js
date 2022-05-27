import React, { useReducer, useState } from 'react'
import {
  Alert,
  Button,
  Card,
  Container,
  Form,
  Spinner,
  Table
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

const UsersPage = () => {
  const [state, dispatch] = useReducer(loginReducer, initialState);

  const [users, setUsers] = useState([]);
  const { addUser } = useAuth();
  const navigate = useNavigate();
  let org = 'FM4'

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '90vh' }}>

      <div className="w-100" style={{ maxWidth: '400px' }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th colspan="3">BusquedaPlaceholder</th>
              <th><Button onClick={() => navigate('/users/add')}>Add User</Button></th>
            </tr>
            <tr>
              <th>#</th>
              <th>Correo</th>
              <th>Role</th>
              <th>Organización</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            {users.map(user =>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>)}

          </tbody>
        </Table>
      </div >
    </Container>
  )
}

export default UsersPage