// import { Button } from 'react-bootstrap'
import { Button } from '@mui/material';

import React from 'react'
import "../commonComp.css";

const AddButton = ({buttonText,handleClick,disable = false,customStyles}) => {
  return (
    <div >
        <Button variant="contained" color="primary" disabled={disable} className={disable ?'addBtn disableBtn' :'addBtn'} onClick={handleClick} style={customStyles}>{buttonText}</Button>
    </div>
  )
}

export default AddButton