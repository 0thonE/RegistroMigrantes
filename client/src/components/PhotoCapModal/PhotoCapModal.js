import React, { useState, useEffect, useRef, useCallback } from "react";

import {
  Box,
  Button,
  Modal,

} from '@sproutsocial/racine';

import Webcam from "react-webcam";

import defaultImage from '../../assets/picturePlaceHolder.png';



const videoConstraints = {
  width: 220,
  height: 200,
  facingMode: "user"
}

const PhotoCapModal = ({ setImg, open = false, modalTitle = 'Captura de imagen', modalSubtitle = 'Toma la foto de la persona a registrar' }) => {
  const [openModal, setOpenModal] = useState(true);
  const [imageSrc, setImageSrc] = useState(defaultImage);

  useEffect(() => {
    setOpenModal(!openModal);
  }, [open]);//eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setImg(imageSrc)
  }, [imageSrc]); //eslint-disable-line react-hooks/exhaustive-deps

  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    setImageSrc(webcamRef.current.getScreenshot());
  }, [webcamRef]);

  const closeModal = () => {
    setTimeout(() => {
      setOpenModal(false);
    }, 500);
  }

  return (

    <Modal
      isOpen={openModal}
      onClose={() => setOpenModal(false)}
      closeButtonLabel="Cerrar Modal"
      zIndex={900}
    >
      <Modal.Header
        title={modalTitle}
        subtitle={modalSubtitle}
      />

      <Modal.Content className='modal-content'>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
        />
      </Modal.Content>

      <Modal.Footer>
        <Box display="flex" justifyContent="flex-end" >
          <Box className="margin-rigth-1" >
            <Button appearance="destructive" onClick={(e) => { closeModal(); }} px={500}>
              Cancelar
            </Button>
          </Box>
          <Box>
            <Button appearance="primary" onClick={(e) => { e.preventDefault(); capture(); closeModal(); }} px={500}>
              Capturar
            </Button>
          </Box>
        </Box>
      </Modal.Footer>
    </Modal>
  )
};



export default PhotoCapModal;
