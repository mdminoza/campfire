import { BaseModel } from './baseModel';

export type CampfireParams = {
  topic: string;
  description: string;
  openTo?: 'Everyone' | 'Invite Only';
  scheduleToStart: Date;
  hidden: boolean;
  status?: 'pending' | 'invited' | '';
  isLoading?: boolean;
  invited?: Object[];
  isSponsored?: boolean;
  duration?: string;
  creator?: {
    uid: string;
    profileUrl: string;
    name: string;
  };
  totalMembers?: number;
  members?: Object[];
};

export type JoinedParams = {
  campfireId: string;
  userId: string;
  isAdmin: boolean;
  isModerator: boolean;
  isSpeaker: boolean;
  userName: string;
  profileUrl: string;
  socketId?: string;
  peerId?: string;
  localStreamId?: string;
};

export type Campfire = CampfireParams & BaseModel;
