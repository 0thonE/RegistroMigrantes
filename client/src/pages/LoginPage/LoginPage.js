import React, { useState, useReducer } from 'react';

// import {
//   Button,
//   Input,
//   FormField,
//   Select,
//   Link
// } from '@sproutsocial/racine';

import firebaseApp from "../../firebase/conection";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { getFirestore, doc, setDoc } from "firebase/firestore";

const auth = getAuth(firebaseApp);

const loginReducer = (state, action) => {
  switch (action.type) {
    case 'field': {
      return {
        ...state,
        [action.fieldName]: action.payload,
      };
    }
    case 'login': {
      return {
        ...state,
        error: '',
        isLoading: true,
      };
    }
    case 'success': {
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
      };
    }
    case 'error': {
      return {
        ...state,
        error: 'Incorrect username or password!',
        isLoggedIn: false,
        isLoading: false,
        username: '',
        password: '',
      };
    }
    case 'logOut': {
      return {
        ...state,
        isLoggedIn: false,
      };
    }
    default:
      return state;
  }
}


const generateRandomPassword = () => {
  let chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let passwordLength = Math.floor(Math.random() * (18 - 12 + 1) + 12);
  let password = '';

  for (var i = 0; i <= passwordLength; i++) {
    let randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber + 1);
  }

  return password;
}

const initialState = {
  username: '',
  password: '',
  role: '',
  org: '',
  isLoading: false,
  error: '',
  isLoggedIn: false,
};

const LoginPage = () => {

  const [state, dispatch] = useReducer(loginReducer, initialState);
  const firestore = getFirestore(firebaseApp);
  const [isRegistering, setIsRegistering] = useState(false);

  const registerUser = async (email, role, org) => {
    let password = generateRandomPassword();
    const infoUser = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).then((usuarioFirebase) => {
      return usuarioFirebase;
    }).catch((error) => {
      dispatch({ type: 'error' })
    });

    if (infoUser)
      sendPasswordResetEmail(auth, email)
        .then(() => {
          dispatch({ type: 'emailSent' })
        })
        .catch((error) => {
          dispatch({ type: 'error' })
          // ..
        });

    console.log(infoUser.user.uid);
    const docuRef = doc(firestore, `users/${infoUser.user.uid}`);
    setDoc(docuRef, { email: email, org: org, role: role });
  }

  const submitHandler = (e) => {
    e.preventDefault();

    console.log("submit", state.email, state.password, state.role, 'FM4');

    if (isRegistering) {
      // registrar
      registerUser(state.email, state.role, 'FM4');
    } else {
      // login
      signInWithEmailAndPassword(auth, state.email, state.password,);
    }
  }

  return (
    <div className="login-wrapper">
      <h3>{isRegistering ? "Registrando nuevo usuario" : "Inicia sesión"}</h3>

      <form onSubmit={submitHandler}>
        <label>Correo
          <input
            placeholder={isRegistering ? 'Correo del nuevo usuario' : 'Ingrese su correo'}
            type="email" id="email" error={isRegistering ? 'Ingrese correo valido' : 'Correo invalido'}
            onChange={({ target }) => dispatch({
              type: 'field',
              fieldName: 'email',
              payload: target.value,
            })}/>
        </label>

        {!isRegistering ?
          <label>Contraseña<input
              type="password" id="password"
              placeholder='Ingrese su contraseña'
              error='Contraseña o correo invalido'
              onChange={({ target }) => dispatch({
                type: 'field',
                fieldName: 'password',
                payload: target.value,
              })}
              />
          </label> :
          <label>rol<select
              id='gender'
              value={state.gender}
              onChange={({ target }) => dispatch({
                type: 'field',
                fieldName: 'role',
                payload: target.value,
              })}>
              <option value="">Selecciona un rol...</option>
              <option value="admin">Administrador</option>
              <option value="analist">Analista</option>
              <option value="volunteer">Voluntario</option>
            </select>
          </label>}

        <button className='login-button' appearance='primary' onClick={submitHandler}>
          {isRegistering ? "Crear Usuario" : "Ingresar"}
        </button>

      </form>
      {/* <form onSubmit={submitHandler}>
        <FormField
          label='Correo'>
          {props => <Input
            placeholder={isRegistering ? 'Correo del nuevo usuario' : 'Ingrese su correo'}
            type="email" id="email" error={isRegistering ? 'Ingrese correo valido' : 'Correo invalido'}
            onChange={({ target }) => dispatch({
              type: 'field',
              fieldName: 'email',
              payload: target.value,
            })}
            {...props} />}
        </FormField>

        {!isRegistering ?
          <FormField
            label='Contraseña'>
            {props => <Input
              type="password" id="password"
              placeholder='Ingrese su contraseña'
              error='Contraseña o correo invalido'
              onChange={({ target }) => dispatch({
                type: 'field',
                fieldName: 'password',
                payload: target.value,
              })}
              {...props} />}
          </FormField> :
          <FormField
            label='Rol'>
            {props => <Select
              id='gender'
              value={state.gender}
              onChange={({ target }) => dispatch({
                type: 'field',
                fieldName: 'role',
                payload: target.value,
              })}
              {...props} >
              <option value="">Selecciona un rol...</option>
              <option value="admin">Administrador</option>
              <option value="analist">Analista</option>
              <option value="volunteer">Voluntario</option>
            </Select>}
          </FormField>}

        <Button className='login-button' appearance='primary' onClick={submitHandler}>
          {isRegistering ? "Crear Usuario" : "Ingresar"}
        </Button>

      </form> */}

      <a className='login-link-actions' underline onClick={() => setIsRegistering(!isRegistering)}>{isRegistering ? "" : "Agregar Usuario"}</a>
      {/* <Link className='login-link-actions' underline onClick={() => setIsRegistering(!isRegistering)}>{isRegistering ? "" : "Agregar Usuario"}</Link> */}
    </div >
  );
}

export default LoginPage;