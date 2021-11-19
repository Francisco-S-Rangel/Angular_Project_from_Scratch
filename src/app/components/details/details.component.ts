import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  gameRating = 0;
  gameId!: string;
  game!: Game;
  routeSub!: Subscription;
  gameSub!: Subscription;

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private httpService: HttpService) { }

  ngOnInit(): void {
    this.routeSub = this.ActivatedRoute.params.subscribe((params: Params) =>{
    this.gameId = params['id'];
    this.getGameDetails(this.gameId);
    });
  }
  getGameDetails(id: string): void {
    this.gameSub = this.httpService.getGameDetails(id).
    subscribe((gameResp: Game)=>{
      this.game = gameResp;

      setTimeout(()=>{
        this.gameRating = this.game.metacritic;
      }, 1000);
    });
  }
  getColor(value: number): string{
    if(value > 80){
      return 'rgb(43,220,26)';
    }else if( value > 60){
      return 'blue';
    }else if( value > 40){
      return 'orange';
    }else if( value >= 1){
      return 'red';
    }else{
      return 'gray';
    }
  }

  ngOnDestroy(): void{
    if(this.gameSub){
      this.gameSub.unsubscribe();
    }
    if(this.routeSub){
      this.routeSub.unsubscribe();
    }
  }

}
