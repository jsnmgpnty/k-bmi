import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Switch,
  TextField,
  FormControlLabel,
  styled,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import { useCalculateBmi } from '../../Hooks/useCalculateBmi';
import SuccessDialog from './SuccessDialog';

const FieldWrapper = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const BmiForm = () => {
  const { submit, bmi, isLoading, error } = useCalculateBmi();
  const [isMetricMode, setIsMetricMode] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bmiRequest, setBmiRequest] = useState({
    weight: 0,
    height: 0,
    heightInches: 0,
  });

  useEffect(() => {
    setHasError(!!error);
  }, [error]);

  useEffect(() => {
    setIsSuccess(!!bmi);
  }, [bmi]);

  const handleSubmit = () => {
    const payload = {
      weight: {
        value: parseFloat(bmiRequest.weight),
        unit: isMetricMode ? 'kg' : 'lbs',
      },
      height: {
        value: isMetricMode
          ? parseFloat(bmiRequest.height)
          : {
              feet: parseFloat(bmiRequest.height),
              inches: parseFloat(bmiRequest.heightInches),
            },
        unit: isMetricMode ? 'cm' : 'ft',
      },
    };
    submit(payload);
  };

  const handleModeChanged = (ev) => {
    const { checked } = ev.target;
    setIsMetricMode(checked);
  };

  const handleTextChanged = (ev) => {
    const { value, name } = ev.target;
    setBmiRequest((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSuccessClose = () => {
    setIsSuccess(false);
    setHasError(false);
    setBmiRequest({
      weight: 0,
      height: 0,
      heightInches: 0,
    });
  };

  const handleErrorClose = (_, reason) => {
    if (reason === 'clickaway') return;
    setHasError(false);
  };

  return (
    <>
      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Enter your height and weight here 💪
          </Typography>
          <Typography variant="body">
            Body Mass Index (BMI) is a person’s weight in kilograms divided by
            the square of height in meters. A high BMI can indicate high body
            fatness. BMI screens for weight categories that may lead to health
            problems, but it does not diagnose the body fatness or health of an
            individual.
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ py: 3 }}>
            <FieldWrapper>
              <FormControlLabel
                control={
                  <Switch
                    defaultChecked
                    value={isMetricMode}
                    onChange={handleModeChanged}
                  />
                }
                label="Use metric?"
              />
            </FieldWrapper>
            <FieldWrapper>
              <TextField
                disabled={isLoading}
                required
                label="Weight"
                name="weight"
                value={bmiRequest.weight}
                type="number"
                onChange={handleTextChanged}
              />
            </FieldWrapper>
            <FieldWrapper sx={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                disabled={isLoading}
                required
                label={isMetricMode ? 'Height (cm)' : 'Height (feet)'}
                name="height"
                value={bmiRequest.height}
                type="number"
                onChange={handleTextChanged}
              />
              {!isMetricMode && (
                <TextField
                  disabled={isLoading}
                  required
                  label="Height (inches)"
                  name="heightInches"
                  value={bmiRequest.heightInches}
                  type="number"
                  onChange={handleTextChanged}
                  sx={{ ml: 3 }}
                />
              )}
            </FieldWrapper>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={error && hasError}
        autoHideDuration={3000}
        onClose={handleErrorClose}
      >
        <Alert severity="error" variant="filled" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
      {isSuccess && bmi && (
        <SuccessDialog
          open={isSuccess && bmi}
          onClose={handleSuccessClose}
          bmi={bmi}
        />
      )}
    </>
  );
};

export default BmiForm;
