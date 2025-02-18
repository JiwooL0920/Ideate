import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import * as sseSlice from '../../redux/slices/sseSlice';
import NumberDropdown from './components/NumberDropdown';
import SubmitButton from './components/SubmitButton';

const SSE = () => {
    const sseState = useSelector<RootState, sseSlice.SSEState>(state => state.sse);
    const dispatch = useDispatch();

    const handleNumberChange = (newValue: number) => {
        dispatch(sseSlice.setNumber(newValue));
    };

    return (
        <div>
            <h1>this is SSE page</h1>
            <NumberDropdown 
                value={sseState.number}
                onChange={handleNumberChange}
            />
            <SubmitButton />
        </div>
    );
};

export default SSE;
