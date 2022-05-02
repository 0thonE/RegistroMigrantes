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

const PhotoCapModal = ({ setImg, open = false }) => {
  const [openModal, setOpenModal] = useState(true);
  const [imageSrc, setImageSrc] = useState(defaultImage);

  useEffect(() => {
    setOpenModal(!openModal);
  }, [open]);//react-hooks/exhaustive-deps

  useEffect(() => {
    setImg(imageSrc)
  }, [imageSrc]); // eslint-disable-line react-hooks/exhaustive-deps

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
      //appElementSelector='___gatsby'
      isOpen={openModal}
      onClose={() => setOpenModal(false)}
      closeButtonLabel="Cerrar Modal"
      zIndex={900}
    >
      {/* <Webcam /> */}

      <Modal.Header
        title="Captura de imagen"
        subtitle="Toma la foto de la persona a registrar"
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
              Cerrar
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
