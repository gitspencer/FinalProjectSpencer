import { AthleteEvent } from "./athlete-event";
import { League } from "./league";
import { User } from "./user";

export class Team {
  id: number;
  athleteEvents: AthleteEvent[];
  user: User | null;
  league: League | null;
  teamName: string;
  photoURL: string;
  description: string;
  createdAt: string | null;
  updatedAt: string | null;
  enabled: boolean;

  constructor(
    id: number = 0,
    athleteEvents: AthleteEvent[] = [],
    user: User | null = null,
    league: League | null = null,
    teamName: string = '',
    photoURL: string = '',
    description: string = '',
    createdAt: string = '',
    updatedAt: string = '',
    enabled: boolean = false
  ) {
    this.id = id;
    this.athleteEvents = athleteEvents,
    this.user = user;
    this.league = league;
    this.teamName = teamName;
    this.photoURL = photoURL;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.enabled = enabled;
  }
}