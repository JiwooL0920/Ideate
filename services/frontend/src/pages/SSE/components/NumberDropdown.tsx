import React from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

interface NumberDropdownProps {
    value: number;
    onChange: (value: number) => void;
}

const NumberDropdown: React.FC<NumberDropdownProps> = ({ value, onChange }) => {
    const handleChange = (event: SelectChangeEvent<number>) => {
        onChange(event.target.value as number);
    };

    return (
        <Select value={value} onChange={handleChange}>
            {Array.from({ length: 100 }, (_, i) => (
                <MenuItem key={i + 1} value={i + 1}>
                    {i + 1}
                </MenuItem>
            ))}
        </Select>
    );
};

export default NumberDropdown;