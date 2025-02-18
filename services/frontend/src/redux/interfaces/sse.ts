export interface TimesTableRequest {
    number: number;
}

export enum Status {
    Init = "INIT",
    Running = "RUNNING",
    Success = "SUCCESS",
    Failed = "FAILED",
}

export interface TimesTableResponse {
    status: Status
    progress: number;
    number: number;
    i: number;
    result: number;
}

export interface SSEEvent {
    type: string;
    data: string;
    timestamp: string;
}