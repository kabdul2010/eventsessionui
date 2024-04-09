import { EventInviteeEntity } from "./event-invitee-entity";

export class SessionEntity {
  eventId!: number;
  eventName!: string;
  eventInviteList!: EventInviteeEntity[]; 
  description!: string;
  organizedBy!:string;
}
