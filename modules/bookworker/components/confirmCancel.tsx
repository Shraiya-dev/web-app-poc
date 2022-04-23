import React, { useState } from "react";

// Material UI
import { Dialog, DialogContent, Button, Typography, Stack } from "@mui/material";

const ConfirmCancel = ({ ...props }) => {
  const [selectedValue, setSelectedValue] = useState("");

  const {onCloseDialog, setOncloseDialog, toggleBookingForm, bookingFormOpen,setBookingFormOpen } = props;

  const handleCancel = ()=>{
    setOncloseDialog(false)
  }

  const handleConfirm = ()=>{
    setOncloseDialog(false);
    setBookingFormOpen(false);

  }
  return (
    <Dialog
      style={{ zIndex: 1800 }}
      open={onCloseDialog}
      keepMounted
      onClose={handleCancel}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <div>
        <DialogContent style={{ width: 452, height: 184 }}>
        <Typography variant="h5" >Leave Booking Workers?</Typography>
        <Typography style={{marginBottom:30}}>There’re unsaved changes</Typography>
        <Stack display={"inline"} style = {{float:"right" }} >
        <Button variant="outlined" onClick={handleCancel} style={{marginRight:10}}> Continue Booking</Button>
         <Button onClick={handleConfirm}> Leave</Button>
        </Stack>
         
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default ConfirmCancel;
