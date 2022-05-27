import React, { createContext, useContext, useEffect, useReducer } from 'react';
import firebaseApp from "../firebase/conection"

import { getFirestore, doc, /* collection,  */setDoc, getDoc } from "firebase/firestore";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  // signOut,
} from "firebase/auth";


const AuthContext = createContext();

const useAuth = () => {
  return useContext(AuthContext);
};


const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);


const authReducer = (state, action) => {
  switch (action.type) {
    case 'loading': {

      return {
        ...state,

      };
    }
    default:
      return state;
  }
}

const initialState = {
  user: '',
  role: '',
  org: 'FM4',
  isLoading: true,
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
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  const addUser = async (email, role) => {

    let randomPassword = generateRandomPassword();

    return new Promise(async (resolve, reject) => {
      let successfullSteps = {}
      try {
        const infoUser = await createUserWithEmailAndPassword(auth, email, randomPassword);
        successfullSteps['add-email'] = true;
        if (infoUser)
          sendPasswordResetEmail(auth, email);
        successfullSteps['send-password-reset'] = true;
        const docuRef = await doc(firestore, `users/${infoUser.user.uid}`);
        await setDoc(docuRef, { email: email, org: state.org, role: role })
        successfullSteps['add-user'] = true;
        resolve({ email, uid: infoUser.user.uid })

      } catch (error) {
        /* TODO: erease email added if already created*/
        reject(error)
      }
    })
  }
  const getUsers = async (email, role) => {

    let randomPassword = generateRandomPassword();

    return new Promise(async (resolve, reject) => {
      let successfullSteps = {}
      try {
        const infoUser = await createUserWithEmailAndPassword(auth, email, randomPassword);
        successfullSteps['add-email'] = true;
        if (infoUser)
          sendPasswordResetEmail(auth, email);
        successfullSteps['send-password-reset'] = true;
        const docuRef = await doc(firestore, `users/${infoUser.user.uid}`);
        await setDoc(docuRef, { email: email, org: state.org, role: role })
        successfullSteps['add-user'] = true;
        resolve({ email, uid: infoUser.user.uid })

      } catch (error) {
        /* TODO: erease email added if already created*/
        reject(error)
      }
    })
  }

  const useLogin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  }

  const getValues = () => {
    return {
      ...state,
      addUser,
      useLogin,
    }
  }


  useEffect(() => {
    if (true !== 0) return

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) return;
      const userInfo = getDoc(doc(firestore, 'immigrants', `${user?.uid}`))
      console.log('userInfo', userInfo?.data())
      // dispatch({ type: 'login' })
    });

    return unsubscribe;
  }, []);

  return (

    <AuthContext.Provider value={getValues()} >
      {/* {!state.isLoading && children} */}
      {children}
    </AuthContext.Provider>
  )
};

export {
  useAuth,
  AuthProvider
}