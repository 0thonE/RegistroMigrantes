import React, { useState, /* useEffect, useRef, useCallback, forwardRef, */ } from "react";

import {
  Box,
  Button,
  // Input,
  // Label,
  Modal,
} from '@sproutsocial/racine';



// import defaultImage from '../../assets/picturePlaceHolder.png';


const AttachFileModal = ({ children, setFile, modalTitle = 'Cargar archivo',
  modalSubtitle = 'Arrastra o selecciona el archivo a cargar y despues da guardar',
}) => {
  const [openModal, setOpenModal] = useState(true);



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
        {children}
      </Modal.Content>

      <Modal.Footer>
        <Box display="flex" justifyContent="flex-end" >
          <Box className="margin-rigth-1" >
            <Button appearance="destructive" onClick={(e) => { e.preventDefault(); closeModal(); }} px={500}>
              Cancelar
            </Button>
          </Box>
          <Box>
            <Button appearance="primary" onClick={(e) => { e.preventDefault(); closeModal(); }} px={500}>
              Guardar
            </Button>
          </Box>
        </Box>
      </Modal.Footer>
    </Modal>
  )
};

const FileAttach = ({ setFile, multiple = false }) => {
  // let draggingCount;

  // const [dragging, setDragging] = useState(false);

  // const buttonRef = useRef(null)

  // const handleChanges = (a, b, c) => {
  //   console.log('a', a)
  //   console.log('b', b)
  //   console.log('c', c)
  //   return true;
  // }

  // const handleDragIn = useCallback((ev) => {
  //   ev.preventDefault();
  //   ev.stopPropagation();
  //   draggingCount++;
  //   if (ev.dataTransfer.items && ev.dataTransfer.items.length !== 0) {
  //     setDragging(true);
  //   }
  // }, []);

  // const handleDragOut = useCallback((ev) => {
  //   ev.preventDefault();
  //   ev.stopPropagation();
  //   draggingCount--;
  //   if (draggingCount > 0) return;
  //   setDragging(false);
  // }, []);

  // const handleDrag = useCallback((ev) => {
  //   ev.preventDefault();
  //   ev.stopPropagation();
  // }, []);

  // const handleDrop = useCallback(
  //   (ev) => {
  //     ev.preventDefault();
  //     ev.stopPropagation();
  //     setDragging(false);
  //     draggingCount = 0;

  //     const eventFiles = ev.dataTransfer.files;
  //     if (eventFiles && eventFiles.length > 0) {
  //       const files = multiple ? eventFiles : eventFiles[0];
  //       const success = handleChanges(files);
  //       if (setFile && success) setFile(files);
  //     }
  //   },
  //   [handleChanges]
  // );

  // useEffect(() => {
  //   const ele = buttonRef.current;
  //   ele.addEventListener('dragenter', handleDragIn);
  //   ele.addEventListener('dragleave', handleDragOut);
  //   ele.addEventListener('dragover', handleDrag);
  //   ele.addEventListener('drop', handleDrop);
  //   return () => {
  //     ele.removeEventListener('dragenter', handleDragIn);
  //     ele.removeEventListener('dragleave', handleDragOut);
  //     ele.removeEventListener('dragover', handleDrag);
  //     ele.removeEventListener('drop', handleDrop);
  //   };
  // }, [
  //   handleDragIn,
  //   handleDragOut,
  //   handleDrag,
  //   handleDrop,
  //   buttonRef
  // ]);


  return (
    <>
      {/* <Input
        type='file'
        onChange={({ target }) => setFile('idDocument', target.value)} /> */}

      {/* <Button ref={buttonRef} onClick={handleChanges} onappearance="placeholder" onDrag={(a, b, c) => {
        console.log('a', a)
        console.log('b', b)
        console.log('c', c)
        alert('enter drag');
      }}>
        <input className="form-control" type="file" />
        Subir archivo
      </Button> */}

    </>
  )
}


export default FileAttach
export { AttachFileModal };
