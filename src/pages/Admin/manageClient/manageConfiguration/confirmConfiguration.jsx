import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function ConfirmConfig({open,updateConfiguration,setOpen,configType}) {

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));



  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
            Are you Sure Want to update the {configType == 1?"Whatsapp":"Messenger"} Config?
        </DialogTitle>
       
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Discard
          </Button>
          <Button onClick={updateConfiguration} autoFocus>
            Proceed
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}