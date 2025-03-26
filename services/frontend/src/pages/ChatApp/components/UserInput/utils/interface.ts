export interface WebSocketRequest {
    messageId: string;
    userId: string;
    question: string;
}

export interface WebSocketResponse {
    messageId: string;
    question: string;
    answer: string;
}
