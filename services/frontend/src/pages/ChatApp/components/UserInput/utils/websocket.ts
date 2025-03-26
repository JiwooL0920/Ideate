import { baseURL } from '../../../../../constants/requests';

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
                    const response = JSON.parse(event.data);
                    if (response.type === 'message') {
                        // Handle the response here
                        console.log('Received response:', response);
                        // Disconnect after receiving response
                        this.disconnect();
                    }
                };
            } catch (error) {
                console.error('Error creating WebSocket:', error);
                reject(error);
            }
        });
    }

    public async send(question: string): Promise<void> {
        try {
            if (!this.ws) {
                await this.connect();
            }

            if (this.ws && this.ws.readyState === WebSocket.OPEN) {
                console.log('Sending question:', question);
                this.ws.send(question);
            } else {
                throw new Error('WebSocket is not connected');
            }
        } catch (error) {
            console.error('Error sending question:', error);
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