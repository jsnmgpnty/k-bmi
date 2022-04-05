import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import { DialogContent, Link } from '@mui/material';

const SuccessDialog = ({ open, onClose, bmi }) => {
  const handleClose = () => {
    if (onClose) onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>We've calculated your BMI</DialogTitle>
      <DialogContent>
        <Typography variant="body">
          Your BMI is <b>{bmi.bmi}</b> which is categorized as{' '}
          <b>{bmi.status}</b>.
        </Typography>
        <Typography variant="body">
          If you wish to learn more about body mass index, click{' '}
          <Link
            underline="none"
            href="https://www.medicalnewstoday.com/articles/323622"
            target="_blank"
          >
            here
          </Link>
          .
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessDialog;
