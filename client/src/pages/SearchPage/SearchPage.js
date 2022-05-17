import React, { /* useState, */ useReducer } from 'react';

import {
  Box,
  Button,
  Input,
  Label,
  Listbox,
  ListboxButton,
  Loader,
  Select,
} from '@sproutsocial/racine'
import { DataCard } from '../../components';

import { useNavigate } from "react-router-dom";
import { SelectableCountries } from "../../utilities/SelectableCountries";


import firebaseApp from "../../firebase/conection";
import { getFirestore, collection, query as queryDoc, where, getDocs } from "firebase/firestore";

const itemsCountries = SelectableCountries();
const itemsGender = [{ value: '', text: 'Selecciona un género...' }, 'Hombre', 'Mujer', 'No binarix'];



const searchReducer = (state, action) => {
  switch (action.type) {
    case 'capitalized-field': {
      let words = action.payload.split(' ');
      let capitalizedWords = words.map((word) => (word) ? word[0]?.toUpperCase() + word?.substr(1) : '');
      return {
        ...state,
        [action.fieldName]: capitalizedWords.join(' '),
      };
    }
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
        searchResults: action.results,
      };
    }
    case 'error': {
      return {
        ...state,
        error: 'Incorrect username or password!',
        isLoggedIn: false,
        isSearching: false,
        username: '',
        password: '',
      };
    }
    default:
      return state;
  }
}

const initialState = {
  name: '',
  fatherSurname: '',
  motherSurname: '',
  originCountry: '',
  birthDate: { value: '', randomNumber: '' },
  gender: '',
  isSearching: false,
  searchResults: [],
}



const SearchPage = () => {

  const [state, dispatch] = useReducer(searchReducer, initialState);

  const navigate = useNavigate();

  const firestore = getFirestore(firebaseApp);

  const onSubmit = () => {
    const { isSearching, searchResults, ...restState } = state;
    navigate(`/registro`, { state: restState });
  }

  const searchImmigrants = async () => {
    const { isSearching, searchResults, ...restState } = state;
    let immRef = collection(firestore, 'immigrants')

    const queryConstraints = []
    Object.entries(restState).forEach(([key, value]) => {
      if (!value)
        return;
      switch (key) {
        // case 'name':
        //   queryConstraints.push(where(key, '>=', value.toUpperCase()));
        //   queryConstraints.push(where(key, '<=', (value + '\uf8ff').toLocaleLowerCase()));
        //   break;
        // case 'fatherSurname':
        //   queryConstraints.push(where(key, '==', value.toUpperCase()));
        //   break;
        // case 'motherSurname':
        //   queryConstraints.push(where(key, '==', value.toUpperCase()));
          // break;
        case 'birthDate':
          if (value.value)
            queryConstraints.push(where(`${key}.value`, '==', value.value));
          break;
        default:
          queryConstraints.push(where(key, '==', value));
          break;
      }
    });
    if (!queryConstraints.length > 0)
      return;

    dispatch({ type: 'searching' })

    const querySnapshot = await getDocs(queryDoc(immRef, ...queryConstraints));

    let docs = []; //
    querySnapshot.forEach((doc) => {
      docs.push({ id: doc.id, ...doc.data() })
    });

    return dispatch({ type: 'search-success', results: [...docs] })
  }

  const downloadImmigrants = async () => {

  }

  return (
    <div className="search-page">
      <Box className="search-wrapper">
        <div className='search-bg' />
        <Box className='search-row' display='flex'>
          <Box className='search-input' width={1 / 3} >
            <Label htmlFor='name' mb={300}>
              Nombre(s)
            </Label>
            <Input
              id='name'
              name='name'
              placeholder="Ingrese nombre"
              value={state.name}
              onChange={({ target }) => dispatch({
                type: 'capitalized-field', fieldName: 'name', payload: target.value,
              })}
              onBlur={searchImmigrants}
            />
          </Box>
          <Box className='search-input' width={1 / 3} >
            <Label htmlFor='fathers-surname' mb={300}>
              Apellido Paterno
            </Label>
            <Input
              id='fathers-surname'
              name='fathers-surname'
              placeholder="Ingrese Apellido Paterno"
              value={state.fatherSurname}
              onChange={({ target }) => dispatch({
                type: 'capitalized-field', fieldName: 'fatherSurname', payload: target.value,
              })}
              onBlur={searchImmigrants}
            />
          </Box>
          <Box className='search-input' width={1 / 3} >
            <Label htmlFor='mothers-surname' mb={300}>
              Apellido Materno
            </Label>
            <Input
              id='mothers-surname'
              name='mothers-surname'
              placeholder="Ingrese Apellido Materno"
              value={state.motherSurname}
              onChange={({ target }) => dispatch({
                type: 'capitalized-field', fieldName: 'motherSurname', payload: target.value,
              })}
              onBlur={searchImmigrants}
            />
          </Box>
        </Box>
        <Box className='search-row' display='flex'>
          <Box className='search-input' width={1 / 3} >
            <Label htmlFor='origin-country' mb={300}>
              País de origen
            </Label>
            <ListboxButton
              width="100%"
              aria-label="país de origen"
              content={
                <Listbox
                  width="100%"
                  value={state.originCountry}
                  onChange={(selection) => dispatch({
                    type: 'field', fieldName: 'originCountry', payload: selection,
                  })}
                  onBlur={searchImmigrants}
                >
                  <Listbox.Group>
                    <Listbox.FilterInput placeholder="Buscar" mb={300} />
                    <div className='scrollable-listbox'>
                      {itemsCountries.map((country, i) => {
                        if (typeof country === 'string')
                          return <Listbox.Item key={`${country}-index`} value={country}>{country}</Listbox.Item>
                        return <Listbox.Item key={`${country.value}-index`} value={country.value}>{country.text}</Listbox.Item>
                      })}
                    </div>
                  </Listbox.Group>
                </Listbox>
              }
            >
              {state.originCountry || "Selecciona un país"}
            </ListboxButton>
          </Box>
          <Box className='search-input' width={1 / 3} display='flex'>
            <Box className='search-rpading' width={1 / 2} >
              <Label htmlFor='name' mb={300}>
                Genero
              </Label>
              <Select
                id='gender'
                value={state.gender}
                onChange={({ target }) => dispatch({
                  type: 'field', fieldName: 'gender', payload: target.value,
                })}
                onBlur={searchImmigrants}
              >
                {itemsGender.map(gender => {
                  if (typeof gender === 'string')
                    return <option key={`${gender}-index`} value={gender}>{gender}</option>
                  return <option key={`${gender.value}-index`} value={gender.value}>{gender.text}</option>
                })}
              </Select>
            </Box>
            <Box className='search-lpading' width={1 / 2} >
              <Label htmlFor='name' mb={300}>
                Fecha Nacimiento
              </Label>
              <Input
                type='date'
                placeholder='dd/mm/yyyy'
                value={state.birthDate?.value}
                onChange={({ target }) => dispatch({
                  type: 'field', fieldName: 'birthDate', payload: { value: target.value, valueAsNumber: target.valueAsNumber },
                })}
                onBlur={searchImmigrants}
              />
            </Box>
          </Box>
          <Box className='search-button' width={1 / 3} >
            <Button className='full-button' appearance='primary' onClick={onSubmit}>
              Crear nuevo registro
            </Button>
          </Box>
        </Box>
      </Box>
      <br /><br />

      <Box className='data-wrapper' display='flex' flexWrap='wrap'>
        {state.isSearching ? <Loader
          className='loading-immigrants'
          text="Buscando migrantes"
          delay={false}
          size='large'
        /> : null}
        {state.searchResults.map(immigrant => (
          <Box key={`${immigrant.id}-immigrant_key`} className='' width={1 / 2} >
            <DataCard
              id={`${immigrant.id}`}
              key={`${immigrant.id}-immigrant_key`}
              fullName={`${immigrant.name || ''} ${immigrant.fatherSurname || ''} ${immigrant.motherSurname || ''}`}
              birthDate={immigrant.birthDate?.value}
              originCountry={immigrant.originCountry}
              src_img={immigrant['user-img']?.url}
              shelterEvents={immigrant.shelterEvents}
              fullInfo={{ ...immigrant }}
            />
          </Box>))}
      </Box>
      <br /><br /><br />
      {/* <Box className="download-fab" display='flex' flexWrap='wrap' flexDirection='row-reverse'>
        <Box className="field-container" width={1 / 5}>
          <Button width='100%' appearance="placeholder"  onClick={downloadImmigrants}>
            Descargar registros
          </Button>
        </Box>
      </Box> */}

    </div>
  )
};

export default SearchPage;
