import { baseURL } from '../../../../../constants/requests';
import { WebSocketRequest, WebSocketResponse } from './interface';

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
                console.log(`Attempting to connect to WebSocket: ws://${baseURL.replace('http://', '')}/chatapp/ws`);
                this.ws = new WebSocket(`ws://${baseURL.replace('http://', '')}/chatapp/ws`);
                
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
                    console.log('Received message:', event.data);
                    const response: WebSocketResponse = JSON.parse(event.data);
                    console.log('Received response:', response);
                    // Disconnect after receiving response
                    this.disconnect();
                };
            } catch (error) {
                console.error('Error creating WebSocket:', error);
                reject(error);
            }
        });
    }

    public async send(request: WebSocketRequest): Promise<void> {
        try {
            if (!this.ws) {
                await this.connect();
            }

            if (this.ws && this.ws.readyState === WebSocket.OPEN) {
                console.log('Sending request:', request);
                this.ws.send(JSON.stringify(request));
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