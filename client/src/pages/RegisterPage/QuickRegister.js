import React, { useState, } from 'react';

import {
  Box,
  Button,
  FormField,
  Input,
  Image,
  Options,
  Radio,
  Select,
} from '@sproutsocial/racine';

import { PhotoCapModal } from '../../components'

import defaultImage from '../../assets/picturePlaceHolder.png';

const itemsYesNo = ['Si', 'No'];
const itemsAtentionPlace = ['Dentro albergue', 'En puerta'];
const itemsGender = [{ value: '', text: 'Selecciona un género...' }, 'Hombre', 'Mujer', 'No binarix'];
const itemsCisTrans = ['Cis', 'Trans'];
const itemsSexualPreference = [{ value: '', text: 'Selecciona una preferencia...' }, 'Gay', 'Lesbiana', 'Bisexual', 'Transgenero', 'Transexual', 'Travesti', 'Intersexual', 'Queer', 'Heterosexual'];
const itemsDisability = [{ value: '', text: 'Selecciona una discapacidad...' }, 'Mental', 'Motriz', 'Física', 'Intelectual'];
const itemsIdType = [{ value: '', text: 'Selecciona un documento...' }, 'Documento/Cédula de Identidad', 'Acta/Partida de Nacimiento', 'Pasaporte', 'Constancia de Nacionalidad', 'Licencia de Manejo', 'INE', 'Matrícula consular'];
const itemsInmProcess = [{ value: '', text: 'Selecciona un proceso...' }, 'Tarjeta de Visitante por Razones Humanitarias (TVRH)', 'Tarjeta de Residente Temporal (TRT)', 'Tarjeta de Residente Permanente (TRP)'];
//socio demographic
const itemsIsCity = [{ value: '', text: 'Selecciona tipo de comunidad...' }, 'Ciudad', 'Pueblo', 'Aldea'];


const QuickRegister = ({ state, updateField }) => {
  const [toogleModal, setToogleModal] = useState(0);
  const [imageSrc, setImageSrc] = useState(defaultImage);


  const isChecked = (value, field) => value === state[field];

  return (<>
    <br /><br />
    <Box className="quick-register" display='flex' flexWrap='wrap' justifyContent='space-between' >

      <Box className="field-container" width={1 / 5} >
        <FormField label='Lugar atencion'>
          {props => itemsAtentionPlace.map(value => <Radio
            className='margin-rigth-1'
            name="lugar-atencion"
            value={value}
            label={value}
            checked={isChecked(value, 'atentionPlace')}
            onChange={({ target }) => updateField('atentionPlace', target.value)}
            {...props} />)}
        </FormField>
      </Box>
      <Box width={1 / 5} >
        <Image className='add-img' alt='Agrega Foto' src={imageSrc} defaultImage={defaultImage}
          onClick={() => setToogleModal(toogleModal + 1)} />
      </Box>
    </Box>
    <br /><br />
    <h3>Datos Personales</h3>
    <br />
    <Box className="quick-register" display='flex' flexWrap='wrap' >

      <Box className="field-container" width={1 / 5} >
        <FormField label='Nombre'>
          {props => <Input
            placeholder='Nombre o Nombres'
            value={state.name}
            onChange={({ target }) => updateField('name', target.value)}
            {...props} />}
        </FormField>
      </Box>

      <Box className="field-container" width={1 / 5} >
        <FormField label='Apellido Paterno'>
          {props => <Input
            placeholder='Apellido Paterno'
            value={state.fatherSurname}
            onChange={({ target }) => updateField('fatherSurname', target.value)}
            {...props} />}
        </FormField>
      </Box>

      <Box className="field-container" width={1 / 5} >
        <FormField label='Apellido Materno'>
          {props => <Input
            placeholder='Apellido Materno'
            value={state.motherSurname}
            onChange={({ target }) => updateField('motherSurname', target.value)}
            {...props} />}
        </FormField>
      </Box>

      <Box className="field-container" width={1 / 5} >
        <FormField label='Nombre no oficial'>
          {props => <Input
            placeholder='Como le gusta que le digan'
            value={state.unofficialName}
            onChange={({ target }) => updateField('unofficialName', target.value)}
            {...props} />}
        </FormField>
      </Box>

      <Box className="field-container" width={1 / 5} >
        {/* <Image className='add-img' alt='Agrega Foto' src={'https://bebidasexquisitas.com/wp-content/uploads/2020/04/Tipos-deWhisky.fimg_.jpg'} defaultImage={defaultImage} /> */}

      </Box>

      <Box className="field-container" width={1 / 5} >
        <FormField label='Fecha de Nacimiento'>
          {props => <Input
            placeholder='dd/mm/yy'
            value={state.birthDate}
            onChange={({ target }) => updateField('birthDate', target.value)}
            {...props} />}
        </FormField>
      </Box>

      <Box className="field-container" width={1 / 5} >
        <FormField label='País de Origen'>
          {props => <Input
            placeholder='País de origen o nacimiento'
            value={state.originCountry}
            onChange={({ target }) => updateField('originCountry', target.value)}
            {...props} />}
        </FormField>
      </Box>

      <Box className="field-container" width={1 / 5} >
        <FormField label='Estado/Departamento'>
          {props => <Input
            placeholder='Estado/departamento'
            value={state.originState}
            onChange={({ target }) => updateField('originState', target.value)}
            {...props} />}
        </FormField>
      </Box>

      <Box className="field-container" width={1 / 5} >
        <FormField label='Municipio/Localidad'>
          {props => <Input
            placeholder='Municipio/Localidad'
            value={state.originCity}
            onChange={({ target }) => updateField('originCity', target.value)}
            {...props} />}
        </FormField>
      </Box>

      <Box className="field-container" width={1 / 5} >
        <FormField label='Género'>
          {props => <Select
            id='gender'
            value={state.gender}
            onChange={({ target }) => updateField('gender', target.value)}
            {...props} >
            {itemsGender.map(gender => {
              if (typeof gender === 'string')
                return <option value={gender}>{gender}</option>
              return <option value={gender.value}>{gender.text}</option>
            })}
          </Select>}
        </FormField>
      </Box>

      <Box className="field-container" width={1 / 5} >
        <FormField label='Persona Cis o Trans'>
          {props => itemsCisTrans.map(value => <Radio
            className='margin-rigth-1'
            name="cis-trans"
            value={value}
            label={value}
            checked={isChecked(value, 'cisTrans')}
            onChange={({ target }) => updateField('cisTrans', target.value)}
            {...props} />)}
        </FormField>
      </Box>

      <Box className="field-container" width={1 / 5} >
        <FormField label='Orientación sexual'>
          {props => <Select
            id='sexual-preference'
            value={state.sexualPreference}
            onChange={({ target }) => updateField('sexualPreference', target.value)}
            {...props} >
            {itemsSexualPreference.map(preference => {
              if (typeof preference === 'string')
                return <option value={preference}>{preference}</option>
              return <option value={preference.value}>{preference.text}</option>
            })}
          </Select>}
        </FormField>
      </Box>

      <Box className="field-container" width={1 / 5} >
        <FormField label='Presenta discapacidad'>
          {props => itemsYesNo.map(value => <Radio
            className='margin-rigth-1'
            name="has-disability"
            value={value}
            label={value}
            checked={isChecked(value, 'hasDisability')}
            onChange={({ target }) => updateField('hasDisability', target.value)}
            {...props} />)}
        </FormField>
      </Box>

      {(state.hasDisability && state.hasDisability.toLowerCase() === 'si') ?
        <Box className="field-container" width={1 / 5} >
          <FormField label='Especificar discapacidad'>
            {props => <Select
              id='disability'
              value={state.disability}
              onChange={({ target }) => updateField('disability', target.value)}
              {...props} >
              {itemsDisability.map(disability => {
                if (typeof disability === 'string')
                  return <option value={disability}>{disability}</option>
                return <option value={disability.value}>{disability.text}</option>
              })}
            </Select>}
          </FormField>
        </Box> : null
      }

      <Box className="field-container" width={1 / 5} >
        <FormField label='Cuenta con señas'>
          {props => <Input
            placeholder='Presenta un razgo particular?'
            value={state.particularCharacteristics}
            onChange={({ target }) => updateField('particularCharacteristics', target.value)}
            {...props} />}
        </FormField>
      </Box>

      <Box className="field-container" width={1 / 5} >
        <FormField label='Cuenta con teléfono'>
          {props => itemsYesNo.map(value => <Radio
            className='margin-rigth-1'
            name="has-phoneNumber"
            value={value}
            label={value}
            checked={isChecked(value, 'hasPhoneNumber')}
            onChange={({ target }) => updateField('hasPhoneNumber', target.value)}
            {...props} />)}
        </FormField>
      </Box>

      {(state.hasPhoneNumber && state.hasPhoneNumber.toLowerCase() === 'si') ?
        <Box className="field-container" width={1 / 5} >
          <FormField label='Número teléfono'>
            {props => <Input
              placeholder='Número télefono'
              value={state.phoneNumber}
              onChange={({ target }) => updateField('phoneNumber', target.value)}
              {...props} />}
          </FormField>
        </Box> : null
      }

      <Box className="field-container" width={1 / 5} >
        <FormField label='Cuenta con documento ID'>
          {props => itemsYesNo.map(value => <Radio
            className='margin-rigth-1'
            name="has-id"
            value={value}
            label={value}
            checked={isChecked(value, 'hasID')}
            onChange={({ target }) => updateField('hasID', target.value)}
            {...props} />)}
        </FormField>
      </Box>

      {(state.hasID && state.hasID.toLowerCase() === 'si') ?
        <Box className="field-container" width={1 / 5} >
          <FormField label='Tipo de documento'>
            {props => <Select
              id='id-type'
              value={state.IdType}
              onChange={({ target }) => updateField('IdType', target.value)}
              {...props} >
              {itemsIdType.map(id => {
                if (typeof id === 'string')
                  return <option value={id}>{id}</option>
                return <option value={id.value}>{id.text}</option>
              })}
            </Select>}
          </FormField>
        </Box> : null
      }

      {(state.hasID && state.hasID.toLowerCase() === 'si') ?
        <Box className="field-container" width={1 / 5} >
          <FormField label='País emisor'>
            {props => <Input
              placeholder='País que emitió el documento'
              value={state.idCountryEmisor}
              onChange={({ target }) => updateField('idCountryEmisor', target.value)}
              {...props} />}
          </FormField>
        </Box> : null
      }

      {/* {(state.hasID && state.hasID.toLowerCase() === 'si') ?
        <Box className="field-container" width={1 / 5} >
          <FormField label='Documentos'>
            {props => <Input
              placeholder='País que emitió el documento'
              value={state.idCountryEmisor}
              onChange={({ target }) => updateField('idCountryEmisor', target.value)}
              {...props} />}
          </FormField>
        </Box> : null
      } */}

      <Box className="field-container" width={1 / 5} >
        <FormField label='Protección internacional'>
          {props => itemsYesNo.map(value => <Radio
            className='margin-rigth-1'
            name="international-protection"
            value={value}
            label={value}
            checked={isChecked(value, 'internationalProtection')}
            onChange={({ target }) => updateField('internationalProtection', target.value)}
            {...props} />)}
        </FormField>
      </Box>

      <Box className="field-container" width={1 / 5} >
        <FormField label='Proceso ante COMAR'>
          {props => itemsYesNo.map(value => <Radio
            className='margin-rigth-1'
            name="comar-process"
            value={value}
            label={value}
            checked={isChecked(value, 'comarProcess')}
            onChange={({ target }) => updateField('comarProcess', target.value)}
            {...props} />)}
        </FormField>
      </Box>

      <Box className="field-container" width={1 / 5} >
        <FormField label='Regularización migratoria'>
          {props => itemsYesNo.map(value => <Radio
            className='margin-rigth-1'
            name="migratory-regulation"
            value={value}
            label={value}
            checked={isChecked(value, 'migratoryRegulation')}
            onChange={({ target }) => updateField('internationalProtection', target.value)}
            {...props} />)}
        </FormField>
      </Box>

      <Box className="field-container" width={1 / 5} >
        <FormField label='Proceso ante INM'>
          {props => <Select
            id='inm-process'
            value={state.inmProcess}
            onChange={({ target }) => updateField('inmProcess', target.value)}
            {...props} >
            {itemsInmProcess.map(process => {
              if (typeof process === 'string')
                return <option value={process}>{process}</option>
              return <option value={process.value}>{process.text}</option>
            })}
          </Select>}
        </FormField>
      </Box>




    </Box >

    <br /><br />
    <h3>Datos Sociodemográficos</h3>
    <br />
    <Box className="quick-register" display='flex' flexWrap='wrap' >

      <Box className="field-container" width={1 / 5} >
        <FormField label='Nombre'>
          {props => <Input
            placeholder='Nombre o Nombres'
            value={state.name}
            onChange={({ target }) => updateField('name', target.value)}
            {...props} />}
        </FormField>
      </Box>

      



    </Box >
    <PhotoCapModal setImg={setImageSrc} open={toogleModal} />
  </>);
}

export default QuickRegister;