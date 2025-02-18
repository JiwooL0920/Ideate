import React from 'react';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { getTimesTable } from '../../../redux/slices/sseSlice';
import { TimesTableRequest } from '../../../redux/interfaces/sse';


const SubmitButton: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Extract `number` from sseSlice state
  const number = useSelector((state: RootState) => state.sse.number);

  const handleClick = () => {
    const request: TimesTableRequest = { number };
    dispatch(getTimesTable(request));
  };

  return (
    <Button variant="contained" onClick={handleClick} sx={{ minWidth: 150 }}>
      Get {number}'s Times Table
    </Button>
  );
};


export default SubmitButton;