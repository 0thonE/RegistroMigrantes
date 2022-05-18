import React, { /* useState, */ useReducer, useEffect } from 'react';

import {
  Box,
  Input,
  Loader,
  FormField
} from '@sproutsocial/racine'

import { useNavigate, useLocation } from "react-router-dom";


import firebaseApp from "../../firebase/conection";
import { getFirestore, doc as docuRef, getDoc } from "firebase/firestore";

const searchReducer = (state, action) => {
  switch (action.type) {
    case 'field': {
      return {
        ...state,
        [action.fieldName]: action.payload,
      };
    }
    case 'searching': {
      return {
        ...state,
        error: '',
        isSearching: true,
        searchResults: [],
      };
    }
    case 'search-success': {
      return {
        ...state,
        isSearching: false,
        personData: { ...action.data },
      };
    }
    default:
      return state;
  }
}

const initialState = {
  isSearching: false,
  personData: {},
}



const SearchPage = () => {

  const [state, dispatch] = useReducer(searchReducer, initialState);

  // const navigate = useNavigate();
  const location = useLocation();

  const firestore = getFirestore(firebaseApp);

  const getPersonInfo = async () => {
    const docId = location.pathname?.split('/')?.[2]
    try {
      const docRef = docuRef(firestore, "immigrants", docId);
      const doc = await getDoc(docRef);
      dispatch({ type: 'search-success', data: doc.data() })
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    getPersonInfo()
  }, []);

  console.log('state', state)
  return (
    <div className="person-data-page">
      <Box className="" display='flex' flexWrap='wrap' >
        {Object.entries(state.personData).map(([key, value]) => (
          <Box className="field-container" width={1 / 5} >
            <FormField label={key}>
              {props => <Input
                readOnly
                placeholder={key}
                value={value}
                {...props} />}
            </FormField>
          </Box>))}

      </Box>


    </div>
  )
};

export default SearchPage;
