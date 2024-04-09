import { PlaceProposeEntity } from "./place-entity-propose";

export class EventDetailEntity {
    eventId!: number;

    eventname!: string;
  
    description!: string;

    organizedBy!: string;

    dateCreated!: string;


    proposals!: PlaceProposeEntity[]; 

    randomSelectedPlace!:string;

  
  }