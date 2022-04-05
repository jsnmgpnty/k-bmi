import axios from 'axios';
import { useState } from 'react';

const API_URL = 'http://localhost:5001/api';

/* eslint-disable import/prefer-default-export */
export function useCalculateBmi() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [bmi, setBmi] = useState();

  const submit = async (request) => {
    if (isLoading) return;
    setIsLoading(true);
    setError(undefined);
    try {
      const result = await axios.post(`${API_URL}/bmi`, request);
      if (!result?.data) throw new Error('Failed to calculate BMI');
      setBmi(result.data);
    } catch (err) {
      let errorMessage = err.message;
      const errorMessages = err?.response?.data;
      if (errorMessages) {
        const list = errorMessages.reduce((prev, curr) => {
          const innerErrors = [...new Set(curr.errors)];
          return [...new Set([...prev, ...innerErrors])];
        }, []);
        errorMessage = list.join(', ');
      }
      setError(errorMessage ?? err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    bmi,
    submit,
  };
}
