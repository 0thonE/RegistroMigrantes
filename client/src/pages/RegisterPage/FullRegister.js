import React, { useState } from 'react'

import {
  // Box,
  Text,
  Link
} from '@sproutsocial/racine';

const FullRegister = ({ state, updateField, updateFile }) => {
  const [showMore, setShowMore] = useState(false);
  return (
    <>
      {/* {showMore ?
        <>info
          <Text fontSize={200}>
            <Link onClick={() => setShowMore(!showMore)}>Registro rápido</Link>
          </Text>
        </>
        : <Text fontSize={200} textDecoration='underline'>
          <Link onClick={() => setShowMore(!showMore)}>Registro completo...</Link>
        </Text>
      } */}
    </>
  )
}

export default FullRegister;