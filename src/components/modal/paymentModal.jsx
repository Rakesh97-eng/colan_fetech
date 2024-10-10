import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import { addPayment } from '../../redux/slice/flowSlice';
import { Formik } from 'formik';

export default function AlertUser({open,setOpenModal}) {
//   const [open, setOpen] = React.useState(false);
const dispatch = useDispatch();
  const handleClickOpen = () => {
    // setOpen(true);
  };
const handleAgree = ()=>{
    dispatch(addPayment(5))
    setOpenModal(false)
}
  const handleClose = () => {
    setOpenModal(false)
    
  };

  return (
    <React.Fragment>
     
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Would you like to upgrade your Tier?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           Since You have choosen "Tier1", Adding card is restricted
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleAgree} autoFocus>
            Upgrade
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
