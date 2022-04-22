import React/* , { useState, useEffect, useRef }  */ from "react";

import {
  Avatar,
  Box,
  Card,
  Image,
  Label,
  Stack,
  Text,
} from '@sproutsocial/racine';

import defaultImage from '../../assets/defaultMigImage.png';

let shelters = [
  {
    shelterName: 'FM4',
    checkIn: '00/00/0000',
    checkOut: '00/00/0000',
    notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation'
  },
  // {
  //   shelterName: 'El refugio',
  //   checkIn: '00/00/0000',
  //   checkOut: '00/00/0000',
  // }
]

const dateToText = (date) => {
  if (typeof date === 'string')
    return date;

  if (date instanceof Date)
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`

  return 'Invalid Type'

}

const DataCard = ({ name = 'Nombre Apellido Apellido', birthDate = '00/00/0000', originCountry = 'País de origen',
  src_img = defaultImage, shelterEvent = shelters }) => {


  return (
    <Card
      className='data-card'
      onClick={() => alert('Show full info')}
      ariaLabel="Migrant content card"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    // py={350}
    // px={450}
    >
      <Box display='flex' width={1} >
        <Box width={2 / 3} /* bg='blue.200' */ >
          <Box className='data-title-wrapper' width={1} >
            <Text
              as="h3"
              fontSize={600}
              fontWeight="bold"
              color="text.headline"
              mb={0}
            >{name}</Text>
          </Box>
          <Box className='data-row' display='flex' width={1}>
            <Box width={1 / 2}>
              <Label className='data-label' >Nacimiento:</Label>
              <Text fontSize={300}>{dateToText(birthDate)}</Text>
            </Box>
            <Box width={1 / 2}>
              <Label className='data-label' >Origen:</Label>
              <Text fontSize={300}>{originCountry}</Text>
            </Box>
          </Box>
          {shelterEvent.map((e) => <>
            <Label >{e.shelterName}:</Label>
            <Box className='data-row' display='flex' width={1}>
              <Box width={1 / 2}>
                <Label className='data-label' >Registro:</Label>
                <Text fontSize={300}>{dateToText(e.checkIn)}</Text>
              </Box>
              <Box width={1 / 2}>
                <Label className='data-label' >Salida:</Label>
                <Text fontSize={300}>{dateToText(e.checkOut)}</Text>
              </Box>
            </Box>
            <Box className='data-row' width={1}>
              <Text className='data-register-note' fontSize={300}>{e.notes}</Text>
            </Box>
          </>)}

        </Box>
        <Box width={1 / 3} >
          <Image className='data-img' alt='Foto Migrante' src={src_img} defaultImage={defaultImage} />
        </Box>
      </Box>
    </Card>
  )
};

export default DataCard;
