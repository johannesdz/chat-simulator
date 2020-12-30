import { Member, MemberId } from './member'

export type MessageId = number;

export interface Message {
  id: MessageId;
  text: string;
  order: number;
  image?: string;
  member?: Member;
  memberId?: MemberId;
  showImage?: boolean;
};
