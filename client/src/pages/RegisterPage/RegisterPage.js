import React, { /* useState, */ useReducer, useEffect } from 'react';

import QuickRegister from './QuickRegister';
import FullRegister from './FullRegister';
import { useLocation } from "react-router-dom";


const initialState = {
  fullRegister: false,
};

const reducer = (state, action) => {
  let type = action.type?.toLocaleLowerCase();
  switch (type) {
    case 'field': {
      return {
        ...state,
        [action.fieldName]: action.payload,
      };
    }
    case 'pass-state': {
      console.log('action.state', action.state)
      return {
        ...state,
        ...action.state,
      };
    }
    case '__': {
      return {
        ...state,
      };
    }
    default:
      break;
  }
  return state;

}

const RegisterPage = () => {

  const [state, dispatch] = useReducer(reducer, initialState);
  const location = useLocation();

  const updateField = (field, value) => {
    dispatch({
      type: 'field',
      fieldName: field,
      payload: value,
    })
  }
  
  
  useEffect(() => {
    dispatch({
      type: 'pass-state',
      state: location.state,
    })
  }, []);




  return (
    <div className="immigrant-register-page">
      {!state.fullRegister ?
        <QuickRegister updateField={updateField} state={state} /> :
        <FullRegister updateField={updateField} />}

    </div>
  )
};

export default RegisterPage;
