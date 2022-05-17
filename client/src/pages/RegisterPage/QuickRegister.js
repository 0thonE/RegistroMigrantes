import React, { useState, useRef, useEffect } from 'react';

import {
  Box,
  Button,
  FormField,
  Input,
  Image,
  Listbox,
  ListboxButton,
  Radio,
  Select,
} from '@sproutsocial/racine';
import { PhotoCapModal, /* FileAttach */ } from '../../components'

import { SelectableCountries } from "../../utilities/SelectableCountries";

import defaultImage from '../../assets/picturePlaceHolder.png';

const itemsYesNo = ['Si', 'No'];
const itemsAtentionPlace = ['Dentro albergue', 'En puerta'];
const itemsCountries = SelectableCountries();
const itemsCivilStatus = [{ value: '', text: 'Selecciona un estado...' }, 'Soltero', 'Casado', 'Divorciado', 'Viudo', 'Union Libre', 'Otro'];
const itemsGender = [{ value: '', text: 'Selecciona un género...' }, 'Hombre', 'Mujer', 'No binarix'];
const itemsCisTrans = ['Cis', 'Trans'];
const itemsSexualPreference = [{ value: '', text: 'Selecciona una preferencia...' }, 'Asexual', 'Bisexual', 'Demisexual', 'Heterosexual', 'Homosexual', 'Pansexual'];
const itemsDisability = [{ value: '', text: 'Selecciona una discapacidad...' }, 'Mental', 'Motriz', 'Física', 'Intelectual'];
const itemsIdType = [{ value: '', text: 'Selecciona un documento...' }, 'Documento/Cédula de Identidad', 'Acta/Partida de Nacimiento', 'Pasaporte', 'Constancia de Nacionalidad', 'Licencia de Manejo', 'INE', 'Matrícula consular'];
const itemsInternationalProtection = [{ value: '', text: 'Selecciona un proceso...' }, 'No ha solicitado refugio', 'Es solicitante de refugio en Jalisco con acuse de recibo del trámite', 'Es solicitante de refugio en Jalisco con constancia de trámite', 'Abandonó el caso de refugio en otro estado', 'Tiene cosntancia de reconocimiento como sujeto de Protección Complementaria', 'Tiene constancia de reconocimiento como Refugiado', 'Realizó el trámite de refugio y la resolución de COMAR fue negativa (le negaron el refugio)', 'Es una persona apátrida',];
const itemsInmProcess = [{ value: '', text: 'Selecciona un proceso...' }, 'Tarjeta de Visitante por Razones Humanitarias (TVRH)', 'Tarjeta de Residente Temporal (TRT)', 'Tarjeta de Residente Permanente (TRP)'];
const itemsLegalCompanion = [{ value: '', text: 'Selecciona un acompañante...' }, 'Papá', 'Mamá', 'Ambxs', 'Tutor legal'];
const itemsNoLegalCompanion = [{ value: '', text: 'Selecciona un acompañante...' }, 'Hermanx', 'Primx', 'Tix', 'Amigx', 'Abuelx'];
//socio demographic
// const itemsZoneType = [{ value: '', text: 'Selecciona tipo de comunidad...' }, 'Ciudad', 'Pueblo', 'Aldea'];
// const itemsReligions = [{ value: '', text: 'Selecciona tipo de comunidad...' }, 'Cátolica', 'Evangélica', 'Cristiana', 'Testigo de Jehová', 'Mormona', 'Anglicana', 'Protestante', 'Prebiteriana', 'Ateo', 'Otro'];


const QuickRegister = ({ state, updateField, updateFile }) => {
  const [toogleUserImgModal, setToogleUserImgModal] = useState(0);
  const [toogleComarImgModal, setToogleComarImgModal] = useState(0);
  const [UserImgSrc, setUserImgSrc] = useState(defaultImage);
  const [isUnderAge, setIsUnderAge] = useState(false);

  const idDocumentRef = useRef(null);
  const comarDocumentRef = useRef(null);
  const inmDocumentRef = useRef(null);

  useEffect(() => {
    if (!state.birthDate) return;
    if (checkAge(state.birthDate?.value))
      return setIsUnderAge(false);
    setIsUnderAge(true);
  }, [state.birthDate]);

  useEffect(() => {
    if (!toogleUserImgModal)
      return
    updateFile('user-img', dataURItoFile(UserImgSrc))
  }, [UserImgSrc]) // eslint-disable-line react-hooks/exhaustive-deps

  const isChecked = (value, field) => value === state[field];

  const checkAge = (dateString, legallAge = 18) => {
    let today = new Date();
    let birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return legallAge <= age;
  }

  const dataURItoFile = (dataURI) => {
    let byteString = atob(dataURI.split(',')[1]);
    let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    let ab = new ArrayBuffer(byteString.length);
    let ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    let blob = new Blob([ab], { type: mimeString });
    return new File([blob], "immigrant-img");

  }

  return (<>
    <br /><br />
    <Box className="quick-register" display='flex' flexWrap='wrap' justifyContent='space-between' >

      <Box className="field-container" width={1 / 5} >
        <FormField label='Lugar atencion'>
          {props => itemsAtentionPlace.map((value, index) => <Radio
            key={`radio-${index}`}
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
        <Image className='add-img' alt='Agrega Foto' src={UserImgSrc} defaultImage={defaultImage}
          onClick={() => setToogleUserImgModal(toogleUserImgModal + 1)} />
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
            onChange={({ target }) => updateField('name', target.value, true)}
            {...props} />}
        </FormField>
      </Box>

      <Box className="field-container" width={1 / 5} >
        <FormField label='Apellido Paterno'>
          {props => <Input
            placeholder='Apellido Paterno'
            value={state.fatherSurname}
            onChange={({ target }) => updateField('fatherSurname', target.value, true)}
            {...props} />}
        </FormField>
      </Box>

      <Box className="field-container" width={1 / 5} >
        <FormField label='Apellido Materno'>
          {props => <Input
            placeholder='Apellido Materno'
            value={state.motherSurname}
            onChange={({ target }) => updateField('motherSurname', target.value, true)}
            {...props} />}
        </FormField>
      </Box>

      <Box className="field-container" width={1 / 5} >
        <FormField label='Nombre no oficial'>
          {props => <Input
            placeholder='Como le gusta que le digan'
            value={state.unofficialName}
            onChange={({ target }) => updateField('unofficialName', target.value, true)}
            {...props} />}
        </FormField>
      </Box>

      <Box className="field-container" width={1 / 5} >
        {/* <Image className='add-img' alt='Agrega Foto' src={'https://bebidasexquisitas.com/wp-content/uploads/2020/04/Tipos-deWhisky.fimg_.jpg'} defaultImage={defaultImage} /> */}

      </Box>

      <Box className="field-container" width={1 / 5} >
        <FormField label='Fecha de Nacimiento'>
          {props => <Input
            type='date'
            placeholder='dd/mm/yyyy'
            value={state.birthDate?.value}
            onChange={({ target }) => updateField('birthDate', { value: target.value, valueAsNumber: target.valueAsNumber })}
            {...props} />}
        </FormField>
      </Box>

      <Box className="field-container" width={1 / 5} >
        <FormField label='País de Origen'>
          {props => <ListboxButton
            width="100%"
            aria-label="país de origen"
            content={
              <Listbox value={state.originCountry} width="100%"
                onChange={(selection) => updateField('originCountry', selection)} >
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
          </ListboxButton>}
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
        <FormField label='Estado Civil'>
          {props => <Select
            id='civilStatus'
            value={state.civilStatus}
            onChange={({ target }) => updateField('civilStatus', target.value)}
            {...props} >
            {itemsCivilStatus.map(gender => {
              if (typeof gender === 'string')
                return <option key={`${gender}-index`} value={gender}>{gender}</option>
              return <option key={`${gender.value}-index`} value={gender.value}>{gender.text}</option>
            })}
          </Select>}
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
                return <option key={`${gender}-index`} value={gender}>{gender}</option>
              return <option key={`${gender.value}-index`} value={gender.value}>{gender.text}</option>
            })}
          </Select>}
        </FormField>
      </Box>

      <Box className="field-container" width={1 / 5} >
        <FormField label='Persona Cis o Trans'>
          {props => itemsCisTrans.map((value, index) => <Radio
            key={`radio-${index}`}
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
                return <option key={`${preference}-index`} value={preference}>{preference}</option>
              return <option key={`${preference.value}-index`} value={preference.value}>{preference.text}</option>
            })}
          </Select>}
        </FormField>
      </Box>

      <Box className="field-container" width={1 / 5} >
        <FormField label='Presenta discapacidad'>
          {props => itemsYesNo.map((value, index) => <Radio
            key={`radio-${index}`}
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
                  return <option key={`${disability}-index`} value={disability}>{disability}</option>
                return <option key={`${disability.value}-index`} value={disability.value}>{disability.text}</option>
              })}
            </Select>}
          </FormField>
        </Box> : null
      }

      <Box className="field-container" width={1 / 5} >
        <FormField label='Cuenta con señas'>
          {props => <Input
            placeholder='¿Presenta un razgo particular?'
            value={state.particularCharacteristics}
            onChange={({ target }) => updateField('particularCharacteristics', target.value)}
            {...props} />}
        </FormField>
      </Box>

      <Box className="field-container" width={1 / 5} >
        <FormField label='Cuenta con teléfono'>
          {props => itemsYesNo.map((value, index) => <Radio
            key={`radio-${index}`}
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
          {props => itemsYesNo.map((value, index) => <Radio
            key={`radio-${index}`}
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
          <FormField label='País emisor de ID'>
            {props => <ListboxButton
              width="100%"
              aria-label="país emisor de id"
              content={
                <Listbox value={state.idCountryEmisor} width="100%"
                  onChange={(selection) => updateField('idCountryEmisor', selection)} >
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
              {state.idCountryEmisor || "Selecciona un país"}
            </ListboxButton>}
          </FormField>
        </Box> : null
      }

      {(state.hasID && state.hasID.toLowerCase() === 'si') ?
        <Box className="field-container" width={1 / 5} >
          <FormField label='Tipo de documento'>
            {props => <>
              <Select
                id='id-type'
                value={state.idType}
                onChange={({ target }) => {
                  updateField('idType', target.value);
                  idDocumentRef.current.click();
                }}
                {...props} >
                {itemsIdType.map(id => {
                  if (typeof id === 'string')
                    return <option key={`${id}-index`} value={id}>{id}</option>
                  return <option key={`${id.value}-index`} value={id.value}>{id.text}</option>
                })}
              </Select>
              <input ref={idDocumentRef} type='file' multiple onChange={({ target }) => updateFile('idDocument', target.files[0])} />
            </>}
          </FormField>
        </Box> : null}

      <Box className="field-container" width={1 / 5} >
        <FormField label='Protección internacional'>
          {props => itemsYesNo.map((value, index) => <Radio
            key={`radio-${index}`}
            className='margin-rigth-1'
            name="international-protection"
            value={value}
            label={value}
            checked={isChecked(value, 'internationalProtection')}
            onChange={({ target }) => updateField('internationalProtection', target.value)}
            {...props} />)}
        </FormField>
      </Box>

      {(state.internationalProtection && state.internationalProtection.toLowerCase() === 'si') ?
        <Box className="field-container" width={1 / 5} >
          <FormField label='Proceso ante COMAR'>
            {props => <Select
              id='id-type'
              value={state.comarProcess}
              onChange={({ target }) => {
                updateField('comarProcess', target.value);
                idDocumentRef.current.click();
              }}
              {...props} >
              {itemsInternationalProtection.map(process => {
                if (typeof process === 'string')
                  return <option key={`${process}-index`} value={process}>{process}</option>
                return <option key={`${process.value}-index`} value={process.value}>{process.text}</option>
              })}
            </Select>}
          </FormField>
        </Box> : null}

      {/* {(state.internationalProtection && state.internationalProtection.toLowerCase() === 'si') ?
        <Box className="field-container" width={1 / 5} >
          <FormField label='Archivo del proceso COMAR'>
            {props => <>
              <Button appearance="placeholder" marginRight='1rem' onClick={() => comarDocumentRef.current.click()}>Archivo</Button>
              <Button appearance="primary" onClick={() => setToogleComarImgModal(toogleComarImgModal + 1)}>Tomar Foto</Button>
              <input ref={comarDocumentRef} type='file' multiple onChange={({ target }) => updateFile('comarDocument', target.files[0])} />
              <PhotoCapModal id='comar-photo' setImg={(photo) => updateFile('comarDocument', photo)} open={toogleComarImgModal} />
            </>}
          </FormField>
        </Box> : null} */}

      <Box className="field-container" width={1 / 5} >
        <FormField label='Regularización migratoria'>
          {props => itemsYesNo.map((value, index) => <Radio
            key={`radio-${index}`}
            className='margin-rigth-1'
            name="migratory-regulation"
            value={value}
            label={value}
            checked={isChecked(value, 'migratoryRegulation')}
            onChange={({ target }) => updateField('migratoryRegulation', target.value)}
            {...props} />)}
        </FormField>
      </Box>

      {(state.migratoryRegulation && state.migratoryRegulation.toLowerCase() === 'si') ?
        <Box className="field-container" width={1 / 5} >
          <FormField label='Proceso ante INM'>
            {props => <><Select
              id='inm-process'
              value={state.inmProcess}
              onChange={({ target }) => {
                updateField('inmProcess', target.value);
                inmDocumentRef.current.click();
              }}
              {...props} >
              {itemsInmProcess.map(process => {
                if (typeof process === 'string')
                  return <option key={`${process}-index`} value={process}>{process}</option>
                return <option key={`${process.value}-index`} value={process.value}>{process.text}</option>
              })}
            </Select>
              <input ref={inmDocumentRef} type='file' multiple onChange={({ target }) => updateFile('inmDocument', target.files[0])} />
            </>}
          </FormField>
        </Box> : null}

      {(isUnderAge) ? <>
        <Box className="field-container" width={1 / 5} >
          <FormField label='¿Menor Legalmente Acompañado?'>
            {props => itemsYesNo.map((value, index) => <Radio
              key={`radio-${index}`}
              className='margin-rigth-1'
              name="legally-accompanied"
              value={value}
              label={value}
              checked={isChecked(value, 'legallyAccompanied')}
              onChange={({ target }) => updateField('legallyAccompanied', target.value)}
              {...props} />)}
          </FormField>
        </Box>

        {(state.legallyAccompanied && state.legallyAccompanied.toLowerCase() === 'si') ?
          <Box className="field-container" width={1 / 5} >
            <FormField label='Acompañante Legal '>
              {props => <Select
                value={state.legalCompanion}
                onChange={({ target }) => {
                  updateField('legalCompanion', target.value);
                }}
                {...props} >
                {itemsLegalCompanion.map(companion => {
                  if (typeof companion === 'string')
                    return <option key={`${companion}-index`} value={companion}>{companion}</option>
                  return <option key={`${companion.value}-index`} value={companion.value}>{companion.text}</option>
                })}
              </Select>}
            </FormField>
          </Box> : null}


        <Box className="field-container" width={1 / 5} >
          <FormField label='¿Menor tiene otro acompañante?'>
            {props => itemsYesNo.map((value, index) => <Radio
              key={`radio-${index}`}
              className='margin-rigth-1'
              name="has-no-legal-companion"
              value={value}
              label={value}
              checked={isChecked(value, 'hasNoLegalCompanion')}
              onChange={({ target }) => updateField('hasNoLegalCompanion', target.value)}
              {...props} />)}
          </FormField>

        {(state.hasNoLegalCompanion && state.hasNoLegalCompanion.toLowerCase() === 'si') ?
          <Box className="field-container" width={1 / 5} >
            <FormField label='Acompañante Legal '>
              {props => <Select
                value={state.legalCompanion}
                onChange={({ target }) => {
                  updateField('legalCompanion', target.value);
                }}
                {...props} >
                {itemsLegalCompanion.map(companion => {
                  if (typeof companion === 'string')
                    return <option key={`${companion}-index`} value={companion}>{companion}</option>
                  return <option key={`${companion.value}-index`} value={companion.value}>{companion.text}</option>
                })}
              </Select>}
            </FormField>
          </Box> : null}
        </Box>

      </> : null}

      <Box className="field-container" width={1 / 5} >
        <FormField label='Cuidadora viajando sola?'>
          {props => itemsYesNo.map((value, index) => <Radio
            key={`radio-${index}`}
            className='margin-rigth-1'
            name="caregiver"
            value={value}
            label={value}
            checked={isChecked(value, 'careGiver')}
            onChange={({ target }) => updateField('careGiver', target.value)}
            {...props} />)}
        </FormField>
      </Box>
      <Box className="field-container" width={1 / 5} >
        <FormField label='Adulto mayor viajando sola?'>
          {props => itemsYesNo.map((value, index) => <Radio
            key={`radio-${index}`}
            className='margin-rigth-1'
            name="elder-alone"
            value={value}
            label={value}
            checked={isChecked(value, 'elderAlone')}
            onChange={({ target }) => updateField('elderAlone', target.value)}
            {...props} />)}
        </FormField>
      </Box>

    </Box >

    <PhotoCapModal id='user-photo' setImg={setUserImgSrc} open={toogleUserImgModal} />
  </>);
}

export default QuickRegister;