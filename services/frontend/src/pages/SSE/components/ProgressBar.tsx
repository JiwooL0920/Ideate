import React from 'react';
import { Box, LinearProgress } from '@mui/material';

interface ProgressBarProps {
  progress: number;
  isVisible: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, isVisible }) => {
  if (!isVisible) return null;

  return (
    <Box sx={{ width: '100%', mb: 2 }}>
      <LinearProgress 
        variant="determinate" 
        value={progress} 
        sx={{ height: 10, borderRadius: 5 }}
      />
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        mt: 1 
      }}>
        {Math.round(progress)}%
      </Box>
    </Box>
  );
};

export default ProgressBar;