import { AthleteEvent } from './../../models/athlete-event';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Athlete } from 'src/app/models/athlete';
import { SportEvent } from 'src/app/models/sport-event';

import { Team } from 'src/app/models/team';
import { User } from 'src/app/models/user';
import { AthleteService } from 'src/app/services/athlete.service';
import { AuthService } from 'src/app/services/auth.service';
import { LeagueService } from 'src/app/services/league.service';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit{
  selectedUser: User | null = null;
  selectedTeam: Team | null = null;
  selectedAthlete: Athlete | null = null;
  teams: Team[] = [];
  athleteEvents: AthleteEvent[] = [];

  constructor(
    private userService: UserService,
    private teamService: TeamService,
    private leagueService: LeagueService,
    private athleteService: AthleteService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService
    ){}

    ngOnInit(): void {
      this.auth.getLoggedInUser().subscribe({
        next: (user) => {
          this.selectedUser = user;
          this.reload();
        },
        error: (err) => {
          console.error('UserComponenet: error on init');
          console.error(err);
        }
      });
    }

    addAthleteToTeam(leagueId: number | undefined, sportEventId: number | undefined, athleteId: number | undefined, team: Team) {
      console.log("LeagueID: " + leagueId);
      console.log("SportEventID: " + sportEventId);
      console.log("AthleteID: " + athleteId);
      if(typeof leagueId === 'number' && typeof sportEventId === 'number' && typeof athleteId === 'number')
        this.teamService.updateTeamRoster(leagueId, sportEventId, athleteId, team).subscribe({
          next: (updatedTeam) => {
          },
          error: (updateError) => {
            console.error('TeamComponenet.updateTeamRoster(): error on update');
            console.error(updateError);

          }
        });
      }

      updateRoster(team: Team){
        this.reloadRoster(team.id);

      }

      selectAthlete(athlete: Athlete | null) {
        this.selectedAthlete = athlete;
      }

      reloadRoster(id: number) {
        this.teamService.index().subscribe({
          next: (teamList) => {
            this.teams = teamList;
            for (let team of teamList) {
              if (team.id === id){
                this.selectedTeam = team;
              }
            }
          },
          error: (someError) => {
            console.error('TodoListComponent.reload(): error getting todo list');
            console.error(someError);
          }
        });
      }

  reload():void {
    this.teamService.index().subscribe({
      next: (teamList) => {
        this.teams = teamList;
        this.selectedTeam = null;
      },
      error: (someError) => {
        console.error('TodoListComponent.reload(): error getting todo list');
        console.error(someError);
      }
    });
  }

  updateTeam(team: Team, goToDetails: boolean = true): void {
      // console.log(selectedUser.username);
      this.teamService.update(team).subscribe({
        next: (updatedTeam) => {
          if (goToDetails){
            this.selectedTeam = updatedTeam;
          }
          else {
            this.selectedTeam = null;
          }
          this.reload();
        },
        error: (updateError) => {
          console.error('TeamComponenet.updateTeam(): error on update');
          console.error(updateError);

        }
      });
  }

}
