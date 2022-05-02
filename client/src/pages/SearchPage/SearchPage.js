import React, { useState } from 'react';

import {
  Box,
  Button,
  Input,
  Label,
} from '@sproutsocial/racine'

import { useNavigate } from "react-router-dom";

import { DataCard } from '../../components';

const SearchPage = () => {
  const [name, setName] = useState('');
  const [fatherSurname, setFatherSurname] = useState('');
  const [motherSurname, setMotherSurname] = useState('');
  const [originCountry, setOriginCountry] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');

  let navigate = useNavigate();



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
          <Input
            id='origin-country'
            name='origin-country'
            placeholder="Ingrese País de origen"
            value={originCountry}
            onChange={({ target }) => setOriginCountry(target.value)}
          />
        </Box>
        <Box className='search-input' width={1 / 3} display='flex'>
          <Box className='search-rpading' width={1 / 2} >
            <Label htmlFor='name' mb={300}>
              Genero
            </Label>
            <Input
              id='gender'
              name='gender'
              placeholder="Ingrese nombre"
              value={gender}
              onChange={({ target }) => setGender(target.value)}
            />
          </Box>
          <Box className='search-lpading' width={1 / 2} >
            <Label htmlFor='name' mb={300}>
              Fecha Nacimiento
            </Label>
            <Input
              id='birthDate'
              name='birthDate'
              placeholder="Ingrese nombre"
              value={birthDate}
              onChange={({ target }) => setBirthDate(target.value)}
            />
          </Box>
        </Box>
        <Box className='search-button' width={1 / 3} >
          <Button className='full-button' appearance='primary'
            onClick={() => navigate(`/registr`)}>Crear nuevo registro</Button>
        </Box>
      </Box>
      <br /><br />
      {/* <DataCard /> */}

    </div>
  )
};

export default SearchPage;
