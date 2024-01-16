export const TWO_MINUTES = 'TWO_MINUTES';

export enum SESSION_TIMEOUT_ENUM {
  EIGHT_HOURS = 'EIGHT_HOURS',
  THREE_HOURS = 'THREE_HOURS',
  ONE_HOUR = 'ONE_HOUR',
  THIRTY_MINUTES = 'THIRTY_MINUTES',
  TWO_MINUTES = 'TWO_MINUTES',
}

export interface ITimeouTOption {
  label: string;
  value: number;
}

type SessionTimeout = {
  [s in SESSION_TIMEOUT_ENUM]?: ITimeouTOption;
};

export const SESSION_TIMEOUT: SessionTimeout = {
  [SESSION_TIMEOUT_ENUM.EIGHT_HOURS]: {
    label: '8 hours',
    value: 60 * 8,
  },
  [SESSION_TIMEOUT_ENUM.THREE_HOURS]: {
    label: '3 hours',
    value: 60 * 3,
  },
  [SESSION_TIMEOUT_ENUM.ONE_HOUR]: {
    label: '60 minutes',
    value: 60,
  },
  [SESSION_TIMEOUT_ENUM.THIRTY_MINUTES]: {
    label: '30 minutes',
    value: 30,
  },
};

if (__DEV__) {
  SESSION_TIMEOUT[TWO_MINUTES] = {
    label: '2 minutes',
    value: 2,
  };
}
