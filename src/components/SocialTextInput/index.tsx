import {
  Input as InputComponent,
  KeyboardAccessory as KeyboardAccessoryComponent,
  OpinionPoll as OpinionPollComponent,
  Recommendation,
  Images,
} from './components/';

export const SocialText = {
  Input: InputComponent,
  Recommendation,
  KeyboardAccessory: KeyboardAccessoryComponent,
  OpinionPoll: OpinionPollComponent,
  Images,
};

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace SocialText {
  export type Input = InputComponent;
  export type KeyboardAccessory = KeyboardAccessoryComponent;
  export type OpinionPoll = OpinionPollComponent;
}
