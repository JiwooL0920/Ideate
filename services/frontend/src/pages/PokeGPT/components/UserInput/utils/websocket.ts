import { baseURL } from '../../../../../constants/requests';
import { WebSocketRequest, WebSocketResponse } from './interface';
import { Message } from '../../../../../redux/slices/pokegptSlice';

class WebSocketService {
    private ws: WebSocket | null = null;
    private reconnectAttempts = 0;
    private maxReconnectAttempts = 5;
    private reconnectDelay = 1000;

    constructor() {
        console.log('WebSocketService initialized');
    }

    private async connect(): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                console.log(`Attempting to connect to WebSocket: ws://${baseURL.replace('http://', '')}/pokegpt/ws`);
                this.ws = new WebSocket(`ws://${baseURL.replace('http://', '')}/pokegpt/ws`);
                
                this.ws.onopen = () => {
                    console.log('WebSocket connected successfully');
                    resolve();
                };

                this.ws.onclose = (event) => {
                    console.log(`WebSocket disconnected: ${event.code}`);
                    this.ws = null;
                };

                this.ws.onerror = (error) => {
                    console.error('WebSocket error:', error);
                    reject(error);
                };

                this.ws.onmessage = (event) => {
                    const response: WebSocketResponse = JSON.parse(event.data);
                    console.log('Received response:', response);
                    this.disconnect();
                };
            } catch (error) {
                console.error('Error creating WebSocket:', error);
                reject(error);
            }
        });
    }

    public async send(request: WebSocketRequest, onResponse: (message: Message) => void): Promise<void> {
        try {
            if (!this.ws) {
                await this.connect();
            }

            if (this.ws && this.ws.readyState === WebSocket.OPEN) {
                console.log('Sending request:', request);
                this.ws.send(JSON.stringify(request));
                
                // Set up message handler for this specific request
                this.ws.onmessage = (event) => {
                    const response: WebSocketResponse = JSON.parse(event.data);
                    console.log('Received response:', response);
                    
                    // Create message object and call callback
                    const message: Message = {
                        messageId: request.messageId,
                        userId: request.userId,
                        question: request.question,
                        answer: response.answer,
                        status: 'completed'
                    };
                    onResponse(message);
                    
                    this.disconnect();
                };
            } else {
                throw new Error('WebSocket is not connected');
            }
        } catch (error) {
            console.error('Error sending request:', error);
            throw error;
        }
    }

    public disconnect(): void {
        if (this.ws) {
            console.log('Disconnecting WebSocket');
            this.ws.close();
            this.ws = null;
        }
    }
}

export const websocketService = new WebSocketService(); 