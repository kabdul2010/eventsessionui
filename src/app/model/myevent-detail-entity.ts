import { MyeventInviteeEntity } from "./myevent-invitee-entity";


export class MyeventDetailEntity {
    eventId!: number;

    eventname!: string;
  
    description!: string;

    organizedBy!: string;

    dateCreated!: string;


    invitees!: MyeventInviteeEntity[]; 

    randomSelectedPlace!:string;

  
  }