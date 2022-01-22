import { BaseModel } from './baseModel';

export type CampfireParams = {
  topic: string;
  description: string;
  openTo?: 'Everyone' | 'Invite Only';
  scheduleToStart: any;
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
    isActive?: boolean;
    socketId?: string;
    peerId?: string;
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
  streamId?: string;
  stream?: any;
};

export type Campfire = CampfireParams & BaseModel;
