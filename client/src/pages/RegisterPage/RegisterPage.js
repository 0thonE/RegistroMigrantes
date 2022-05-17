import React, { /* useState, */ useReducer, useEffect } from 'react';

import {
  Box,
  Button,
  LoaderButton,
} from '@sproutsocial/racine';

import QuickRegister from './QuickRegister';
import FullRegister from './FullRegister';

import { useLocation, useNavigate } from "react-router-dom";
import firebaseApp from "../../firebase/conection";
import { getFirestore, doc, addDoc, setDoc, collection } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


const initialState = {
  fullRegister: false,
  files: [],
  birthDate: { value: '', valueAsNumber: '' },
  caregiver: '',
  cisTrans: '',
  civilStatus: '',
  comarProcess: '',
  elderAlone: '',
  fatherSurname: '',
  gender: '',
  hasDisability: '',
  hasID: '',
  hasPhoneNumber: '',
  idCountryEmisor: '',
  idType: '',
  inmProcess: '',
  internationalProtection: '',
  migratoryRegulation: '',
  motherSurname: '',
  name: '',
  originCity: '',
  originCountry: '',
  originState: '',
  particularCharacteristics: '',
  phoneNumber: '',
  sexualPreference: '',
  unofficialName: '',
};

const reducer = (state, action) => {
  let type = action.type?.toLocaleLowerCase();
  switch (type) {
    case 'capitalized-field': {
      let words = action.payload.split(' ');
      let capitalizedWords = words.map((word) => {
        if (!word) return '';
        return word[0].toUpperCase() + word.substr(1)
      }).join(' ');
      return {
        ...state,
        [action.fieldName]: capitalizedWords,
      };
    }
    case 'field': {
      return {
        ...state,
        [action.fieldName]: action.payload,
      };
    }
    case 'file': {
      let files = [...state.files];
      const fileIndex = files.findIndex(e => e.fileName === action.fileName);
      if (fileIndex > -1) files[fileIndex].file = action.payload; // (2)
      else
        files.push({
          fileName: action.fileName,
          file: action.payload,
          type: action.payload?.type,
        })

      return {
        ...state,
        files: [...files],
      };
    }
    case 'pass-state': {
      return {
        ...state,
        ...action.state,
      };
    }
    case 'uploading': {
      return {
        ...state,
        // isLoading: true
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
  const navigate = useNavigate();
  const firestore = getFirestore(firebaseApp);

  const updateField = (field, value, capitalized = false) => {
    if (capitalized)
      return dispatch({
        type: 'capitalized-field',
        fieldName: field,
        payload: value,
      });

    return dispatch({
      type: 'field',
      fieldName: field,
      payload: value,
    })
  }
  const updateFile = (field, value) => {
    return dispatch({
      type: 'file',
      fileName: field,
      payload: value,
    })
  }

  const registerImmigrant = async () => {
    dispatch({ type: 'uploading' });
    let { files, ...restState } = state;

    let dRef;
    // let steps=[];

    try {
      await addDoc(collection(firestore, 'immigrants'), {})
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          dRef = docRef.id
          // steps.push({name:'document created', ref:dRef});
        });

      const docuRef = doc(firestore, `immigrants/${dRef}`);
      const storage = getStorage();

      for (const f in files) {
        let storageRef = ref(storage, `${dRef}/${files[f].fileName}`);
        await uploadBytes(storageRef, files[f].file, { contentType: files[f].type })
          .then(async (snapshot) => {
            let downloadUrl = await getDownloadURL(storageRef);
            restState[storageRef.name] = { path: storageRef.fullPath, url: downloadUrl };
          });
      }

      setDoc(docuRef, { ...restState, id: dRef });
    } catch (error) {
    }

  }

  useEffect(() => {
    dispatch({
      type: 'pass-state',
      state: location.state,
    })
  }, []); // eslint-disable-line

  return (
    <div className="immigrant-register-page">
      <QuickRegister updateField={updateField} updateFile={updateFile} state={state} />
      <FullRegister updateField={updateField} />


      <Box className="quick-register" display='flex' flexWrap='wrap' flexDirection='row-reverse'>
        <Box className="field-container" width={1 / 5}>
          <LoaderButton width='100%' appearance="primary" isLoading={state.isLoading} onClick={registerImmigrant}>
            Registrar
          </LoaderButton>
        </Box>
        <Box className="field-container" width={1 / 5}>
          <Button width='100%' appearance="destructive" onClick={() => navigate(`/`)}>
            Cancelar
          </Button>
        </Box>
      </Box>


    </div>
  )
};

export default RegisterPage;
