import React, { useState, useRef } from 'react'

import {
  Box,
  Text,
  Link,
  FormField,
  Radio,
  Select,
  Input,
  Listbox,
  ListboxButton,

} from '@sproutsocial/racine';

import { SelectableCountries } from "../../utilities/SelectableCountries";


const itemsCountries = SelectableCountries();
const itemsYesNo = ['Si', 'No'];
const itemsContractTypes = [{ value: '', text: 'Selecciona un contrato...' }, 'Por obra o tiempo determinado', 'Por tiempo indeterminado', 'Por periodo de prueba', 'Por capacitación inicial', 'Por temporada'];
const itemsMedicalAttentionPlaces = [{ value: '', text: 'Selecciona un lugar...' }, 'Centro de salud', 'Hospital civil', 'Otro'];
const itemsFeelings = ['Alegría', 'Tristeza', 'Desagrado', 'Furia', 'Temor'];
const itemsTransportation = [{ value: '', text: 'Selecciona un lugar...' }, 'Vehículo', 'Tren', 'Camión', 'Avión'];
const itemsRouteReasons = [{ value: '', text: 'Selecciona un lugar...' }, 'Seguridad', 'Rapidez', 'Facilidad de trayecto', 'Siguiendo a grupo'];

const FullRegister = ({ state, updateField, updateFile }) => {
  const [showMore, setShowMore] = useState(true);
  const [formalJob, setFormalJob] = useState('');



  const cvDocumentRef = useRef(null);

  const isChecked = (value, field) => value === state[field];

  return (
    <>
      {showMore ?
        <>
          <br /><br />
          <h3>Empleo</h3>
          <br />
          <Box className="quick-register" display='flex' flexWrap='wrap' >

            <Box className="field-container" width={1 / 5} >
              <FormField label='¿Cuenta con permiso de trabajo?'>
                {props => itemsYesNo.map((value, index) => <Radio
                  key={`radio-${index}`}
                  className='margin-rigth-1'
                  name="has-work-permit"
                  value={value}
                  label={value}
                  checked={isChecked(value, 'hasWorkPermit')}
                  onChange={({ target }) => updateField('hasWorkPermit', target.value)}
                  {...props} />)}
              </FormField>
            </Box>

            <Box className="field-container" width={1 / 5} >
              <FormField label='¿Cuenta con empleo?'>
                {props => itemsYesNo.map((value, index) => <Radio
                  key={`radio-${index}`}
                  className='margin-rigth-1'
                  name="has-job"
                  value={value}
                  label={value}
                  checked={isChecked(value, 'hasJob')}
                  onChange={({ target }) => updateField('hasJob', target.value)}
                  {...props} />)}
              </FormField>
            </Box>

            {(state.hasJob && state.hasJob.toLowerCase() === 'si') ?
              <>
                <Box className="field-container" width={1 / 5} >
                  <FormField label='¿Cómo consiguió empleo?'>
                    {props => <Input
                      placeholder='Cómo consiguió el empleo'
                      value={state.howGotJob}
                      onChange={({ target }) => updateField('howGotJob', target.value)}
                      {...props} />}
                  </FormField>
                </Box>
                <Box className="field-container" width={1 / 5} >
                  <FormField label='Lugar de empleo'>
                    {props => <Input
                      placeholder='En que lugar trabaja'
                      value={state.jobPlace}
                      onChange={({ target }) => updateField('jobPlace', target.value)}
                      {...props} />}
                  </FormField>
                </Box>
                <Box className="field-container" width={1 / 5} >
                  <FormField label='Descripción del empleo'>
                    {props => <Input
                      placeholder='Una breve descripción del trabajo'
                      value={state.jobDescription}
                      onChange={({ target }) => updateField('jobDescription', target.value)}
                      {...props} />}
                  </FormField>
                </Box>
                <Box className="field-container" width={1 / 5} >
                  <FormField label='Nombre del emmpleador'>
                    {props => <Input
                      placeholder='Empleador'
                      value={state.employerName}
                      onChange={({ target }) => updateField('employerName', target.value)}
                      {...props} />}
                  </FormField>
                </Box>
                <Box className="field-container" width={1 / 5} >
                  <FormField label='Dirección del emmpleo'>
                    {props => <Input
                      placeholder='Dirección'
                      value={state.jobAddress}
                      onChange={({ target }) => updateField('jobAddress', target.value)}
                      {...props} />}
                  </FormField>
                </Box>
                <Box className="field-container" width={1 / 5} >
                  <FormField label='Teléfono del emmpleo'>
                    {props => <Input
                      placeholder='Teléfono del emmpleo'
                      value={state.jobPhoneNumber}
                      onChange={({ target }) => updateField('jobPhoneNumber', target.value)}
                      {...props} />}
                  </FormField>
                </Box>
                <Box className="field-container" width={1 / 5} >
                  <FormField label='Nombre del jefe'>
                    {props => <Input
                      placeholder='Jefe inmediato'
                      value={state.bossName}
                      onChange={({ target }) => updateField('bossName', target.value)}
                      {...props} />}
                  </FormField>
                </Box>

                <Box className="field-container" width={1 / 5} >
                  <FormField label='Empleo formal'>
                    {props => itemsYesNo.map((value, index) => <Radio
                      key={`radio-${index}`}
                      className='margin-rigth-1'
                      name="formal-job"
                      value={value}
                      label={value}
                      checked={value === formalJob}
                      onChange={({ target }) => setFormalJob(target.value)}
                      // checked={isChecked(value, 'formalJob')}
                      // onChange={({ target }) => updateField('formalJob', target.value)}
                      {...props} />)}
                  </FormField>
                </Box>


                {(formalJob && formalJob.toLowerCase() === 'si') ?
                  <>
                    <Box className="field-container" width={1} ></Box>
                    <Box className="field-container" width={1} >
                      <h5>Empleo Formal</h5>
                    </Box>
                    <Box className="field-container" width={1 / 5} >
                      <FormField label='Firmo contrato'>
                        {props => itemsYesNo.map((value, index) => <Radio
                          key={`radio-${index}`}
                          className='margin-rigth-1'
                          name="sign-contract"
                          value={value}
                          label={value}
                          checked={isChecked(value, 'signContract')}
                          onChange={({ target }) => updateField('signContract', target.value)}
                          {...props} />)}
                      </FormField>
                    </Box>
                    <Box className="field-container" width={1 / 5} >
                      <FormField label='Tipo de contratación'>
                        {props => <Select
                          id='contract-type'
                          value={state.contractType}
                          onChange={({ target }) => updateField('contractType', target.value)}
                          {...props} >
                          {itemsContractTypes.map(contract => {
                            if (typeof contract === 'string')
                              return <option key={`${contract}-index`} value={contract}>{contract}</option>
                            return <option key={`${contract.value}-index`} value={contract.value}>{contract.text}</option>
                          })}
                        </Select>}
                      </FormField>
                    </Box>
                    <Box className="field-container" width={1 / 5} >
                      <FormField label='Tiempo de empleo formal'>
                        {props => <Input
                          placeholder='¿Por cuánto tiempo?'
                          value={state.formalEmploymentTime}
                          onChange={({ target }) => updateField('formalEmploymentTime', target.value)}
                          {...props} />}
                      </FormField>
                    </Box>
                    <Box className="field-container" width={1 / 5} >
                      <FormField label='Salario Empleo'>
                        {props => <Input
                          placeholder='¿Cuál será el salario quincenal?'
                          value={state.formalEmploymentSalary}
                          onChange={({ target }) => updateField('formalEmploymentSalary', target.value)}
                          {...props} />}
                      </FormField>
                    </Box>
                    <Box className="field-container" width={1 / 5} >
                      <FormField label='Prestaciones empleo'>
                        {props => <Input
                          placeholder='¿Qué prestaciones va a tener?'
                          value={state.formalLegalBenefits}
                          onChange={({ target }) => updateField('formalLegalBenefits', target.value)}
                          {...props} />}
                      </FormField>
                    </Box>
                    <Box className="field-container" width={1 / 5} >
                      <FormField label='Horario empleo'>
                        {props => <Input
                          placeholder='¿Cuál es el horario laboral?'
                          value={state.formalJobSchedule}
                          onChange={({ target }) => updateField('formalJobSchedule', target.value)}
                          {...props} />}
                      </FormField>
                    </Box>
                  </> : (formalJob && formalJob.toLowerCase() === 'no') ?
                    //Informal Job
                    <>
                      <Box className="field-container" width={1} ></Box>
                      <Box className="field-container" width={1} >
                        <h5>Empleo Informal</h5>
                      </Box>
                      <Box className="field-container" width={1 / 5} >
                        <FormField label='Acuerdo empleo'>
                          {props => <Input
                            placeholder='¿Con quién se hizo el acuerdo?'
                            value={state.informalJobAgreement}
                            onChange={({ target }) => updateField('informalJobAgreement', target.value)}
                            {...props} />}
                        </FormField>
                      </Box>
                      <Box className="field-container" width={1 / 5} >
                        <FormField label='Periodicidad del empleo'>
                          {props => <Input
                            placeholder='Periocidad del empleo'
                            value={state.informalJobAgreement}
                            onChange={({ target }) => updateField('informalJobAgreement', target.value)}
                            {...props} />}
                        </FormField>
                      </Box>
                      <Box className="field-container" width={1 / 5} >
                        <FormField label='Descripción empleo'>
                          {props => <Input
                            placeholder='Periocidad del empleo'
                            value={state.informalJobFrequency}
                            onChange={({ target }) => updateField('informalJobFrequency', target.value)}
                            {...props} />}
                        </FormField>
                      </Box>
                      <Box className="field-container" width={1 / 5} >
                        <FormField label='Apoyo empleo'>
                          {props => <Input
                            placeholder='Apoyos a recibir'
                            value={state.informalBenefits}
                            onChange={({ target }) => updateField('informalBenefits', target.value)}
                            {...props} />}
                        </FormField>
                      </Box>
                      <Box className="field-container" width={1 / 5} >
                        <FormField label='Autoempleo'>
                          {props => <Input
                            placeholder='En caso de ser autoempleo, describir'
                            value={state.selfEmployment}
                            onChange={({ target }) => updateField('selfEmployment', target.value)}
                            {...props} />}
                        </FormField>
                      </Box>
                      <Box className="field-container" width={1 / 5} >
                        <FormField label='Salario Empleo'>
                          {props => <Input
                            placeholder='¿Cuál será el salario quincenal?'
                            value={state.informalEmploymentSalary}
                            onChange={({ target }) => updateField('informalEmploymentSalary', target.value)}
                            {...props} />}
                        </FormField>
                      </Box>
                    </> : null}

                <Box className="field-container" width={1 / 5} >
                  <FormField label='¿Termino la relación laboral?'>
                    {props => itemsYesNo.map((value, index) => <Radio
                      key={`radio-${index}`}
                      className='margin-rigth-1'
                      name="formal-job"
                      value={value}
                      label={value}
                      checked={isChecked(value, 'endedEmployment')}
                      onChange={({ target }) => updateField('endedEmployment', target.value)}
                      {...props} />)}
                  </FormField>
                </Box>


                {(state.endedEmployment && state.endedEmployment.toLowerCase() === 'si') ?
                  <>
                    <Box className="field-container" width={1 / 5} >
                      <FormField label='Abrio proceso legal por terminación injustificada'>
                        {props => itemsYesNo.map((value, index) => <Radio
                          key={`radio-${index}`}
                          className='margin-rigth-1'
                          name="formal-job"
                          value={value}
                          label={value}
                          checked={isChecked(value, 'openedLegalProcess')}
                          onChange={({ target }) => updateField('openedLegalProcess', target.value)}
                          {...props} />)}
                      </FormField>
                    </Box>
                    <Box className="field-container" width={1 / 5} >
                      <FormField label='¿Se cubrieron todos los pagos o prestaciones?'>
                        {props => itemsYesNo.map((value, index) => <Radio
                          key={`radio-${index}`}
                          className='margin-rigth-1'
                          name="formal-job"
                          value={value}
                          label={value}
                          checked={isChecked(value, 'missingPaymentBenefits')}
                          onChange={({ target }) => updateField('missingPaymentBenefits', target.value)}
                          {...props} />)}
                      </FormField>
                    </Box>
                    <Box className="field-container" width={1 / 5} >
                      <FormField label='¿Por qué cesó la relación laboral?'>
                        {props => <Input
                          placeholder='Razón de dejar trabajo'
                          value={state.employmentObservations}
                          onChange={({ target }) => updateField('employmentObservations', target.value)}
                          {...props} />}
                      </FormField>
                    </Box>
                    <Box className="field-container" width={1 / 5} >
                      <FormField label='Observaciones laborales'>
                        {props => <Input
                          placeholder='Observaciones en experiencia laborales'
                          value={state.employmentObservations}
                          onChange={({ target }) => updateField('employmentObservations', target.value)}
                          {...props} />}
                      </FormField>
                    </Box>
                    <Box className="field-container" width={1 / 5} >
                      <FormField label='¿Se hicieron vinculaciones?'>
                        {props => itemsYesNo.map((value, index) => <Radio
                          key={`radio-${index}`}
                          className='margin-rigth-1'
                          name="formal-job"
                          value={value}
                          label={value}
                          checked={isChecked(value, 'missingPaymentBenefits')}
                          onChange={({ target }) => updateField('missingPaymentBenefits', target.value)}
                          {...props} />)}
                      </FormField>
                    </Box>
                  </> : null}
              </> : null}

            <Box className="field-container" width={1 / 5} >
              <FormField label='Curriculum Vitae'>
                {props => <>
                  <Link style={{ textDecoration: 'underline', fontSize: '1rem' }} onClick={() => cvDocumentRef.current.click()}
                    {...props}>Clic para subir CV</Link>
                  <input ref={cvDocumentRef} type='file' multiple onChange={({ target }) => updateFile('cvDocument', target.files[0])} />
                </>}
              </FormField>
            </Box>
          </Box >

          <br /><br />
          <h3>Salud</h3>
          <br />
          <Box className="quick-register" display='flex' flexWrap='wrap' >
            <Box className="field-container" width={1 / 5} >
              <FormField label='Padecimientos físicos'>
                {props => <Input
                  placeholder='Presenta padecimiento físico'
                  value={state.physicalIllness}
                  onChange={({ target }) => updateField('physicalIllness', target.value)}
                  {...props} />}
              </FormField>
            </Box>
            <Box className="field-container" width={1 / 5} >
              <FormField label='Enfermedad crónica'>
                {props => <Input
                  placeholder='¿Tiene alguna enfermedad crónica?'
                  value={state.chronicIllness}
                  onChange={({ target }) => updateField('chronicIllness', target.value)}
                  {...props} />}
              </FormField>
            </Box>
            <Box className="field-container" width={1 / 5} >
              <FormField label='¿Toma algún medicamento actualmente?'>
                {props => itemsYesNo.map((value, index) => <Radio
                  key={`radio-${index}`}
                  className='margin-rigth-1'
                  name="has-work-permit"
                  value={value}
                  label={value}
                  checked={isChecked(value, 'takesMedicine')}
                  onChange={({ target }) => updateField('takesMedicine', target.value)}
                  {...props} />)}
              </FormField>
            </Box>
            <Box className="field-container" width={1 / 5} >
              <FormField label='¿Cuenta con alguna alergia?'>
                {props => itemsYesNo.map((value, index) => <Radio
                  key={`radio-${index}`}
                  className='margin-rigth-1'
                  name="has-work-permit"
                  value={value}
                  label={value}
                  checked={isChecked(value, 'hasAllergies')}
                  onChange={({ target }) => updateField('hasAllergies', target.value)}
                  {...props} />)}
              </FormField>
            </Box>
            <Box className="field-container" width={1 / 5} >
              <FormField label='¿Ha recibido atención médica?'>
                {props => itemsYesNo.map((value, index) => <Radio
                  key={`radio-${index}`}
                  className='margin-rigth-1'
                  name="has-work-permit"
                  value={value}
                  label={value}
                  checked={isChecked(value, 'hasReceivedMedicalAttention')}
                  onChange={({ target }) => updateField('hasReceivedMedicalAttention', target.value)}
                  {...props} />)}
              </FormField>
            </Box>

            {(state.hasReceivedMedicalAttention && state.hasReceivedMedicalAttention.toLowerCase() === 'si') ?
              <>
                <Box className="field-container" width={1 / 5} >
                  <FormField label='Fecha que recibió atención médica'>
                    {props => <Input
                      type='date'
                      placeholder='dd/mm/yyyy'
                      value={state.medicalAttentionDate?.value}
                      onChange={({ target }) => updateField('medicalAttentionDate', { value: target.value, valueAsNumber: target.valueAsNumber })}
                      {...props} />}
                  </FormField>
                </Box>
                <Box className="field-container" width={1 / 5} >
                  <FormField label='¿Dónde se brindo la atención médica?'>
                    {props => <Select
                      id='medical-attention-place'
                      value={state.medicalAttentionPlace}
                      onChange={({ target }) => updateField('medicalAttentionPlace', target.value)}
                      {...props} >
                      {itemsMedicalAttentionPlaces.map(place => {
                        if (typeof place === 'string')
                          return <option key={`${place}-index`} value={place}>{place}</option>
                        return <option key={`${place.value}-index`} value={place.value}>{place.text}</option>
                      })}
                    </Select>}
                  </FormField>
                </Box>
                <Box className="field-container" width={1 / 5} >
                  <FormField label='¿Se canalizo a otro tipo de atención?'>
                    {props => itemsYesNo.map((value, index) => <Radio
                      key={`radio-${index}`}
                      className='margin-rigth-1'
                      name="channeled"
                      value={value}
                      label={value}
                      checked={isChecked(value, 'channeled')}
                      onChange={({ target }) => updateField('channeled', target.value)}
                      {...props} />)}
                  </FormField>
                </Box>
              </> : null}

            <Box className="field-container" width={1 / 5} >
              <FormField label='¿Cómo se ha sentido durante su trayecto?(2)'>
                {props => <ListboxButton
                  width="100%"
                  aria-label="país de origen"
                  content={
                    <Listbox multiselect value={state.journeyFeelings} width="100%"
                      onChange={(selected) => {
                        let newSelection = Array.isArray(state.journeyFeelings) ? [...state.journeyFeelings] : [];
                        let indx = newSelection.findIndex(feeling => selected === feeling);
                        if (indx > -1)
                          newSelection.splice(indx, 1);
                        else
                          newSelection.push(selected);
                        if (newSelection.length > 2) return;
                        return updateField('journeyFeelings', newSelection);
                      }} >
                      <Listbox.Group>
                        {itemsFeelings.map(country => {
                          if (typeof country === 'string')
                            return <Listbox.Checkbox key={`${country}-index`} value={country}>{country}</Listbox.Checkbox>
                          return <Listbox.Checkbox key={`${country.value}-index`} value={country.value}>{country.text}</Listbox.Checkbox>
                        })}
                      </Listbox.Group>
                    </Listbox>
                  }
                >
                  {state.journeyFeelings?.join(', ') || "Selecciona un sentimiento..."}
                </ListboxButton>}
              </FormField>
            </Box>
          </Box>

          <br /><br />
          <h3>Movilidad</h3>
          <br />
          <Box className="quick-register" display='flex' flexWrap='wrap' >
            <Box className="field-container" width={1 / 5} >
              <FormField label='¿Había salido antes de su lugar de origen?'>
                {props => itemsYesNo.map((value, index) => <Radio
                  key={`radio-${index}`}
                  className='margin-rigth-1'
                  name="left-origin-before"
                  value={value}
                  label={value}
                  checked={isChecked(value, 'leftOriginBefore')}
                  onChange={({ target }) => updateField('leftOriginBefore', target.value)}
                  {...props} />)}
              </FormField>
            </Box>
            <Box className="field-container" width={1 / 5} >
              <FormField label='Fecha de salida de lugar de origen'>
                {props => <Input
                  type='date'
                  placeholder='dd/mm/yyyy'
                  value={state.originDepartureDate?.value}
                  onChange={({ target }) => updateField('originDepartureDate', { value: target.value, valueAsNumber: target.valueAsNumber })}
                  {...props} />}
              </FormField>
            </Box>
            <Box className="field-container" width={1 / 5} >
              <FormField label='Punto de entrada a México'>
                {props => <Input
                  placeholder='Localidad o punto de entrada a México'
                  value={state.mexicoEntryPlace}
                  onChange={({ target }) => updateField('mexicoEntryPlace', target.value)}
                  {...props} />}
              </FormField>
            </Box>
            <Box className="field-container" width={1 / 5} >
              <FormField label='Fecha que ingreso a México'>
                {props => <Input
                  type='date'
                  placeholder='dd/mm/yyyy'
                  value={state.mexicoEntryDate?.value}
                  onChange={({ target }) => updateField('mexicoEntryDate', { value: target.value, valueAsNumber: target.valueAsNumber })}
                  {...props} />}
              </FormField>
            </Box>
            <Box className="field-container" width={1 / 5} >
              <FormField label='Forma de desplazamiento'>
                {props => <Input
                  placeholder='¿Cuál ha sido su forma de desplazamiento?'
                  value={state.displacementForm}
                  onChange={({ target }) => updateField('displacementForm', target.value)}
                  {...props} />}
              </FormField>
            </Box>
            <Box className="field-container" width={1 / 5} >
              <FormField label='¿Ha recibido ayuda durante su trayecto?'>
                {props => itemsYesNo.map((value, index) => <Radio
                  key={`radio-${index}`}
                  className='margin-rigth-1'
                  name="left-origin-before"
                  value={value}
                  label={value}
                  checked={isChecked(value, 'hasGotHelp')}
                  onChange={({ target }) => updateField('hasGotHelp', target.value)}
                  {...props} />)}
              </FormField>
            </Box>
            {(state.hasGotHelp && state.hasGotHelp.toLowerCase() === 'si') ?
              <Box className="field-container" width={1 / 5} >
                <FormField label='¿De quién?'>
                  {props => <Input
                    placeholder='¿Quién le ha brindado ayuda?'
                    value={state.gotHelpFrom}
                    onChange={({ target }) => updateField('gotHelpFrom', target.value)}
                    {...props} />}
                </FormField>
              </Box> : null}

            <Box className="field-container" width={1 / 5} >
              <FormField label='Formas de transporte'>
                {props => <Select
                  id='transportation-way'
                  value={state.transportationWay}
                  onChange={({ target }) => updateField('transportationWay', target.value)}
                  {...props} >
                  {itemsTransportation.map(transport => {
                    if (typeof transport === 'string')
                      return <option key={`${transport}-index`} value={transport}>{transport}</option>
                    return <option key={`${transport.value}-index`} value={transport.value}>{transport.text}</option>
                  })}
                </Select>}
              </FormField>
            </Box>

            <Box className="field-container" width={1 / 5} >
              <FormField label='¿Teme regresar a su país de origen?'>
                {props => itemsYesNo.map((value, index) => <Radio
                  key={`radio-${index}`}
                  className='margin-rigth-1'
                  name="left-origin-before"
                  value={value}
                  label={value}
                  checked={isChecked(value, 'fearsOriginCountry')}
                  onChange={({ target }) => updateField('fearsOriginCountry', target.value)}
                  {...props} />)}
              </FormField>
            </Box>
            {(state.fearsOriginCountry && state.fearsOriginCountry.toLowerCase() === 'si') ?
              <Box className="field-container" width={1 / 5} >
                <FormField label='¿Por qué teme regresar?'>
                  {props => <Input
                    placeholder='Razon por la que teme regresar'
                    value={state.fearsOriginCountryReason}
                    onChange={({ target }) => updateField('fearsOriginCountryReason', target.value)}
                    {...props} />}
                </FormField>
              </Box> : null}

            <Box className="field-container" width={1 / 5} >
              <FormField label='País destino'>
                {props => <ListboxButton
                  width="100%"
                  aria-label="país de origen"
                  content={
                    <Listbox value={state.destinyCountry} width="100%"
                      onChange={(selection) => updateField('destinyCountry', selection)} >
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
                  {state.destinyCountry || "Selecciona un país"}
                </ListboxButton>}
              </FormField>
            </Box>
            <Box className="field-container" width={1 / 5} >
              <FormField label='Ciudad destino'>
                {props => <Input
                  placeholder='A que ciudad se dirige'
                  value={state.destinyCity}
                  onChange={({ target }) => updateField('destinyCity', target.value)}
                  {...props} />}
              </FormField>
            </Box>
            <Box className="field-container" width={1 / 5} >
              <FormField label='Motivos de salida'>
                {props => <Input
                  placeholder='¿Por qué salío del lugar de origen?'
                  value={state.departureReasons}
                  onChange={({ target }) => updateField('departureReasons', target.value)}
                  {...props} />}
              </FormField>
            </Box>
            <Box className="field-container" width={1 / 5} >
              <FormField label='Motivos de salida'>
                {props => <Input
                  placeholder='¿Por qué salío del lugar de origen?'
                  value={state.departureReasons}
                  onChange={({ target }) => updateField('departureReasons', target.value)}
                  {...props} />}
              </FormField>
            </Box>
            <Box className="field-container" width={1 / 5} >
              <FormField label='Meses dentro de México'>
                {props => <Input
                  placeholder='¿Por qué salío del lugar de origen?'
                  value={state.monthsInMexico}
                  onChange={({ target }) => updateField('monthsInMexico', target.value)}
                  {...props} />}
              </FormField>
            </Box>
            <Box className="field-container" width={1 / 5} >
              <FormField label='¿Por qué eligio la ruta?'>
                {props => <Select
                  id='transportation-way'
                  value={state.routeSelectionReason}
                  onChange={({ target }) => updateField('routeSelectionReason', target.value)}
                  {...props} >
                  {itemsRouteReasons.map(transport => {
                    if (typeof transport === 'string')
                      return <option key={`${transport}-index`} value={transport}>{transport}</option>
                    return <option key={`${transport.value}-index`} value={transport.value}>{transport.text}</option>
                  })}
                </Select>}
              </FormField>
            </Box>
          </Box>

          <br /><br />
          <Text fontSize={200}>
            <Link onClick={() => setShowMore(!showMore)}>Registro rápido</Link>
          </Text>
        </>
        : <Text fontSize={200} textDecoration='underline'>
          <Link onClick={() => setShowMore(!showMore)}>Registro completo...</Link>
        </Text>
      }
    </>
  )
}

export default FullRegister;