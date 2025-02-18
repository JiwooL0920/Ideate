import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { baseURL } from '../../../constants/requests';
import { setStreaming, clearEvents, addEvent } from '../../../redux/slices/sseSlice';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  LinearProgress,
  Box
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

  // Add new useEffect to handle number changes
  useEffect(() => {
    setTableData({});
    setProgress(0);
  }, [number]);

  useEffect(() => {
    let eventSource: EventSource | null = null;
    let eventQueue: Array<{ type: string; data: any }> = [];
    let animationFrameId: number;

    const processEventQueue = () => {
      const BATCH_SIZE = 10;
      const batch = eventQueue.splice(0, BATCH_SIZE);
      
      batch.forEach(event => {
        // Log every event first
        dispatch(addEvent({
          type: event.type,
          data: event.data,
          timestamp: new Date().toISOString()
        }));

        // Then process the event
        if (event.type === 'message') {
          const data = JSON.parse(event.data);
          setTableData(prev => ({
            ...prev,
            [data.number]: {
              ...(prev[data.number] || {}),
              [data.i]: data.result
            }
          }));
        } else if (event.type === 'progress') {
          setProgress(parseFloat(event.data));
        }
      });

      if (eventQueue.length > 0) {
        animationFrameId = requestAnimationFrame(processEventQueue);
      }
    };

    if (isStreaming) {
      setProgress(0);
      setTableData({});
      dispatch(clearEvents());
      eventSource = new EventSource(`${baseURL}/sse/${number}`);
      
      // Connection established
      eventSource.addEventListener('connected', (event) => {
        console.log('SSE Connection established:', event.data);
        dispatch(addEvent({
          type: 'connected',
          data: event.data,
          timestamp: new Date().toISOString()
        }));
      });

      // Regular data messages
      eventSource.onmessage = (event) => {
        eventQueue.push({ type: 'message', data: event.data });
        if (eventQueue.length === 1) {
          animationFrameId = requestAnimationFrame(processEventQueue);
        }
      };

      // Progress updates
      eventSource.addEventListener('progress', (event) => {
        eventQueue.push({ type: 'progress', data: event.data });
        if (eventQueue.length === 1) {
          animationFrameId = requestAnimationFrame(processEventQueue);
        }
      });

      // Stream completion
      eventSource.addEventListener('complete', (event) => {
        console.log('SSE Stream completed:', event.data);
        dispatch(addEvent({
          type: 'complete',
          data: event.data,
          timestamp: new Date().toISOString()
        }));
        dispatch(setStreaming(false)); // Set streaming to false on completion
        eventSource?.close();
      });

      // Error handling
      eventSource.addEventListener('error', (event) => {
        console.error('SSE Error:', event);
        dispatch(addEvent({
          type: 'error',
          data: 'Connection error',
          timestamp: new Date().toISOString()
        }));
        dispatch(setStreaming(false)); // Also set streaming to false on error
        eventSource?.close();
      });
    }

    return () => {
      if (eventSource) {
        console.log('Closing SSE connection');
        eventSource.close();
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
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
      <TableContainer component={Paper}>
        <Table size="small" aria-label="multiplication table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', bgcolor: 'grey.100' }}>×</TableCell>
              {columns.map(col => (
                <TableCell 
                  key={col} 
                  align="center"
                  sx={{ fontWeight: 'bold', bgcolor: 'grey.100' }}
                >
                  {col}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {columns.map(row => (
              <TableRow key={row} sx={{ '&:nth-of-type(odd)': { bgcolor: 'grey.50' } }}>
                <TableCell sx={{ fontWeight: 'bold', bgcolor: 'grey.100' }}>
                  {row}
                </TableCell>
                {columns.map(col => (
                  <TableCell 
                    key={`${row}-${col}`} 
                    align="center"
                    sx={{ 
                      transition: 'background-color 0.3s',
                      bgcolor: tableData[row]?.[col] ? 'inherit' : 'grey.50'
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