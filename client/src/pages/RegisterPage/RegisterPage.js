import React, { /* useState, */ useReducer } from 'react';

import QuickRegister from './QuickRegister';
import FullRegister from './FullRegister';

// import {
//   Box,
//   Button,
//   Input,
//   Label,
// } from '@sproutsocial/racine';

const initialState = {
  quickRegister: true,
  name:'luigi'
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

  const updateField = (field, value) => {
    dispatch({
      type: 'field',
      fieldName: field,
      payload: value,
    })
  }



  return (
    <div className="immigrant-register-page">
      {state.quickRegister ?
        <QuickRegister updateField={updateField} state={state} /> :
        <FullRegister updateField={updateField} />}

    </div>
  )
};

export default RegisterPage;
