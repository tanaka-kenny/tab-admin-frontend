import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export type Alert = {
    type: MessageType;
    alertType?: string;
    message: string;
    fontIcon?: IconDefinition;
}

export enum MessageType {
    SUCCESS,
    DANGER,
    WARNING,
    INFO
}
