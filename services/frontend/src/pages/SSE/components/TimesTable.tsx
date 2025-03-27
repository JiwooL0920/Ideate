import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { baseURL } from '../../../constants/requests';
import { setStreaming } from '../../../redux/slices/sseSlice';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  LinearProgress,
  Box,
  useTheme
} from '@mui/material';

interface TableData {
  [key: number]: { [key: number]: number };
}

const TimesTable: React.FC = () => {
  const [tableData, setTableData] = useState<TableData>({});
  const [progress, setProgress] = useState(0);
  const number = useSelector((state: RootState) => state.sse.number);
  const isStreaming = useSelector((state: RootState) => state.sse.isStreaming);
  const dispatch = useDispatch();
  const theme = useTheme();

  // Add new useEffect to handle number changes
  useEffect(() => {
    setTableData({});
    setProgress(0);
  }, [number]);

  useEffect(() => {
    let eventSource: EventSource | null = null;

    if (isStreaming) {
      setProgress(0);
      setTableData({});
      eventSource = new EventSource(`${baseURL}/sse/${number}`);
      
      // Connection established
      eventSource.addEventListener('connected', (event) => {
        console.log('SSE Connection established:', event.data);
      });

      // Regular data messages
      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setTableData(prev => ({
          ...prev,
          [data.number]: {
            ...(prev[data.number] || {}),
            [data.i]: data.result
          }
        }));
      };

      // Progress updates
      eventSource.addEventListener('progress', (event) => {
        setProgress(parseFloat(event.data));
      });

      // Stream completion
      eventSource.addEventListener('complete', (event) => {
        console.log('SSE Stream completed:', event.data);
        dispatch(setStreaming(false)); // Set streaming to false on completion
        eventSource?.close();
      });

      // Error handling
      eventSource.addEventListener('error', (event) => {
        console.error('SSE Error:', event);
        dispatch(setStreaming(false)); // Also set streaming to false on error
        eventSource?.close();
      });
    }

    return () => {
      if (eventSource) {
        console.log('Closing SSE connection');
        eventSource.close();
      }
    };
  }, [number, isStreaming, dispatch]);

  const columns = Array.from({ length: number }, (_, i) => i + 1);

  return (
    <Box sx={{ width: '100%', maxWidth: 650, margin: '20px auto' }}>
      {isStreaming && (
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
      )}
      <TableContainer 
        component={Paper} 
        sx={{ 
          backgroundColor: theme.palette.background.paper,
          '& .MuiPaper-root': {
            backgroundColor: theme.palette.background.paper,
          }
        }}
      >
        <Table size="small" aria-label="multiplication table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ 
                fontWeight: 'bold', 
                bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.100',
                color: theme.palette.text.primary
              }}>×</TableCell>
              {columns.map(col => (
                <TableCell 
                  key={col} 
                  align="center"
                  sx={{ 
                    fontWeight: 'bold', 
                    bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.100',
                    color: theme.palette.text.primary
                  }}
                >
                  {col}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {columns.map(row => (
              <TableRow key={row} sx={{ 
                '&:nth-of-type(odd)': { 
                  bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.50'
                }
              }}>
                <TableCell sx={{ 
                  fontWeight: 'bold', 
                  bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.100',
                  color: theme.palette.text.primary
                }}>
                  {row}
                </TableCell>
                {columns.map(col => (
                  <TableCell 
                    key={`${row}-${col}`} 
                    align="center"
                    sx={{ 
                      transition: 'background-color 0.3s',
                      bgcolor: tableData[row]?.[col] 
                        ? theme.palette.mode === 'dark' ? 'grey.800' : 'inherit'
                        : theme.palette.mode === 'dark' ? 'grey.900' : 'grey.50',
                      color: theme.palette.text.primary
                    }}
                  >
                    {tableData[row]?.[col] || ''}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TimesTable;