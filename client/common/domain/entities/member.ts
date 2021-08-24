import { BaseModel } from './baseModel';

export type MemberParams = {
  profileUrl?: string;
  name?: string;
  email?: string;
  status: 'pending' | 'invited';
  role: 'speaker' | 'moderator' | 'audience';
  isRaising?: boolean;
  isMuted?: boolean;
};

export type Member = MemberParams & BaseModel;
