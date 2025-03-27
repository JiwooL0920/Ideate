import { v4 as uuidv4 } from 'uuid';

export const generateMessageId = (): string => {
    return uuidv4();
};
