import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { MainService } from 'src/app/MainService.Service';
import { Elevator } from 'src/app/models/elevator.model';

@Component({
  selector: 'app-elevator',
  templateUrl: './elevator.component.html',
  styleUrls: ['./elevator.component.css'],
  animations:
 [
    trigger('elevatorState',[
      state('up', style({
        transform:'translateY(-{{nextY}}px)',
      }),{params: {nextY: '0'}}),
      state('down', style({
      transform:'translateY({{nextY}}px)'
      }),{params: {nextY: '0'}}),
      transition('*=>up',animate("{{duration}}s ease-in-out")),
      transition('*=>down',animate("{{duration}}s ease-in-out"))
    ]
    )
  ]
})

export class ElevatorComponent implements OnInit {
  @Input() elevator:Elevator
   state:string
   onMove:boolean
   private activeSub:Subscription
  constructor(private mainService:MainService) { }

  ngOnInit(): void {
    this.state=''
    this.activeSub=this.mainService.elevatorOnMoveDirection.subscribe(movDir=>{
      this.state=movDir
    })
  }
  ngOnDestroy():void{
    this.activeSub.unsubscribe()
  }
}