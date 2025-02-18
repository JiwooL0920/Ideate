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
    let keepAliveInterval: NodeJS.Timeout;

    const processEventQueue = () => {
      const BATCH_SIZE = 10;
      const batch = eventQueue.splice(0, BATCH_SIZE);
      
      batch.forEach(event => {
        dispatch(addEvent({
          type: event.type,
          data: event.data,
          timestamp: new Date().toISOString()
        }));

        // Process events regardless of visibility
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
          const progressValue = parseFloat(event.data);
          setProgress(progressValue);
          
          if (progressValue >= 100) {
            dispatch(setStreaming(false));
            eventSource?.close();
            if (keepAliveInterval) {
              clearInterval(keepAliveInterval);
            }
          }
        }
      });

      // Use setTimeout instead of requestAnimationFrame for background processing
      if (eventQueue.length > 0) {
        if (document.hidden) {
          setTimeout(processEventQueue, 100);
        } else {
          animationFrameId = requestAnimationFrame(processEventQueue);
        }
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (isStreaming) {
          // Process queue immediately when hidden
          if (eventQueue.length > 0) {
            setTimeout(processEventQueue, 100);
          }
          
          keepAliveInterval = setInterval(() => {
            if (!isStreaming) {
              clearInterval(keepAliveInterval);
              return;
            }
            if (eventSource?.readyState !== EventSource.OPEN) {
              console.log('Connection lost in background, reconnecting...');
              eventSource?.close();
              eventSource = new EventSource(`${baseURL}/sse/${number}`, {
                withCredentials: true
              });
              attachEventListeners(eventSource);
            }
          }, 1000);
        }
      } else {
        if (keepAliveInterval) {
          clearInterval(keepAliveInterval);
        }
        // Resume animation frame processing when visible
        if (eventQueue.length > 0) {
          animationFrameId = requestAnimationFrame(processEventQueue);
        }
      }
    };

    // Helper function to attach all event listeners
    const attachEventListeners = (source: EventSource) => {
      source.addEventListener('connected', (event) => {
        console.log('SSE Connection established:', event.data);
        dispatch(addEvent({
          type: 'connected',
          data: event.data,
          timestamp: new Date().toISOString()
        }));
      });

      source.onmessage = (event) => {
        eventQueue.push({ type: 'message', data: event.data });
        if (eventQueue.length === 1) {
          animationFrameId = requestAnimationFrame(processEventQueue);
        }
      };

      source.addEventListener('progress', (event) => {
        eventQueue.push({ type: 'progress', data: event.data });
        if (eventQueue.length === 1) {
          animationFrameId = requestAnimationFrame(processEventQueue);
        }
      });

      source.addEventListener('complete', (event) => {
        console.log('Stream completed');
        dispatch(addEvent({
          type: 'complete',
          data: event.data,
          timestamp: new Date().toISOString()
        }));
        // Only close and cleanup if we're actually done
        if (!document.hidden) {
          dispatch(setStreaming(false));
          source.close();
          if (keepAliveInterval) {
            clearInterval(keepAliveInterval);
          }
        }
      });
    };

    if (isStreaming) {
      setProgress(0);
      setTableData({});
      dispatch(clearEvents());
      
      eventSource = new EventSource(`${baseURL}/sse/${number}`, {
        withCredentials: true
      });

      attachEventListeners(eventSource);
      document.addEventListener('visibilitychange', handleVisibilityChange);
    }

    return () => {
      if (eventSource) {
        console.log('Closing SSE connection');
        eventSource.close();
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (keepAliveInterval) {
        clearInterval(keepAliveInterval);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
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