export interface SnackBarMessage {
    message: string;
    action: string;
    type: MessageType;
}

export enum MessageType {
    success,
    error,
    info,
    warning,
}
