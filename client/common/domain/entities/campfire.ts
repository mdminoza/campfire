import { BaseModel } from './baseModel';

export type CampfireParams = {
  topic: string;
  description: string;
  openTo: 'Everyone' | 'Invite Only';
  scheduleToStart: Date;
  hidden: boolean;
  status?: 'pending' | 'invited' | '';
  isLoading?: boolean;
  invited?: Object[];
  isSponsored?: boolean;
  duration?: string;
  durationStartedAt?: Date;
};

export type Campfire = CampfireParams & { creatorId: string } & BaseModel;
