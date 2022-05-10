import React, { useState } from 'react';

import {
  Box,
  Button,
  Input,
  Label,
  Listbox,
  ListboxButton,
  Select,
} from '@sproutsocial/racine'

import { useNavigate } from "react-router-dom";

import { DataCard } from '../../components';
import { SelectableCountries } from "../../utilities/SelectableCountries";

const itemsCountries = SelectableCountries();
const itemsGender = [{ value: '', text: 'Selecciona un género...' }, 'Hombre', 'Mujer', 'No binarix'];

const SearchPage = () => {
  const [name, setName] = useState('');
  const [fatherSurname, setFatherSurname] = useState('');
  const [motherSurname, setMotherSurname] = useState('');
  const [originCountry, setOriginCountry] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');

  const navigate = useNavigate();

  return (
    <div>
      <Box className='search-row' display='flex'>
        <Box className='search-input' width={1 / 3} >
          <Label htmlFor='name' mb={300}>
            Nombre(s)
          </Label>
          <Input
            id='name'
            name='name'
            placeholder="Ingrese nombre"
            value={name}
            onChange={e => setName(e.target.value)}
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
            value={fatherSurname}
            onChange={({ target }) => setFatherSurname(target.value)}
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
            value={motherSurname}
            onChange={({ target }) => setMotherSurname(target.value)}
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
              <Listbox value={originCountry} width="100%"
                onChange={(selection) => setOriginCountry(selection)} >
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
            {originCountry || "Selecciona un país"}
          </ListboxButton>
        </Box>
        <Box className='search-input' width={1 / 3} display='flex'>
          <Box className='search-rpading' width={1 / 2} >
            <Label htmlFor='name' mb={300}>
              Genero
            </Label>
            {/* <Input
              id='gender'
              name='gender'
              placeholder="Ingrese nombre"
              value={gender}
              onChange={({ target }) => setGender(target.value)}
            /> */}
            <Select
            id='gender'
            value={gender}
            onChange={({ target }) => setGender(target.value)} >
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
              value={birthDate?.value}
              onChange={({ target }) => setBirthDate({ value: target.value, valueAsNumber: target.valueAsNumber })} />
          </Box>
        </Box>
        <Box className='search-button' width={1 / 3} >
          <Button className='full-button' appearance='primary'
            onClick={() => navigate(`/registro`, {state:{ name, fatherSurname, motherSurname, originCountry, birthDate, gender, }})}>
            Crear nuevo registro
          </Button>
        </Box>
      </Box>
      <br /><br />
      <DataCard key={12} />

    </div>
  )
};

export default SearchPage;
