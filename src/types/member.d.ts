export type MemberId = number;

export interface Member {
  id: MemberId;
  name: string;
  color?: string;
  image?: string;
  isOwner?: boolean;
  isDelatable?: boolean;
};
