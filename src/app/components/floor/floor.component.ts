import { Component, Input, OnInit } from '@angular/core';
import { MainService } from 'src/app/MainService.Service';
import { Elevator } from 'src/app/models/elevator.model';
import { floor } from 'src/app/models/floor.model';

@Component({
  selector: 'app-floor',
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.css']
})
export class FloorComponent implements OnInit {
  @Input() floor:floor
  elevators: Elevator[]=[]
  timeboxDisplay:string
  constructor(private mainService:MainService) { }

  ngOnInit(): void {
  this.elevators=this.mainService.GetElevators()
  }
  // this function responsible to transform the number in seconds into a mm:ss format
  transformDisplay(value: number): string {
           const minutes: number = Math.floor(value / 60);
           const seconds: number=(value - minutes * 60)
           let secondsLeadingZero:string=''
           let minutesLeadingZero:string=''
            if(seconds<10){
              secondsLeadingZero ='0' ;
            }
            if(minutes<10){
              minutesLeadingZero ='0' ;
            }
           return minutesLeadingZero+ minutes + ':' + secondsLeadingZero+ seconds;
      }
      // when we click the call elevator button in each floor this function will start and handle the call
  callElevator():void{
      this.floor.waitingForElevatorToCome=true
      this.mainService.InviteElevatorCall(this.floor.floorId)
      this.floor.timeUntilElevatorComes=this.mainService.GetElevatorById(
      this.floor.closestAvailableElevatorId).timeToAvailableForNextAssignment-2
      this.timeboxDisplay=this.transformDisplay(this.floor.timeUntilElevatorComes) 
      this.startCountdown()
      }
// the functions starts an interval and handle all the system progress in any second until an elevator eventually serve the floor
  startCountdown():void {
    let counter = this.floor.timeUntilElevatorComes
    let assignedElevator:Elevator=this.mainService.GetElevatorById(this.floor.closestAvailableElevatorId)
    if(assignedElevator.currentTargetFloor==this.floor.floorId){
      assignedElevator.setMovementStatus()
      this.setElevatorDirection(assignedElevator)
    }
    const interval = setInterval(() => {
      if(counter==0){
        this.floor.waitingForElevatorToCome=false
        this.playElevatorArrivedSound()
        assignedElevator.updateCurrentFloor()
      }
      counter--
      if(assignedElevator.currentTargetFloor==this.floor.floorId){
          assignedElevator.setMovementStatus()  
          assignedElevator.timeToAvailableForNextAssignment--
      }
      if(counter>-1){
        this.floor.timeUntilElevatorComes=counter
      }
      this.timeboxDisplay=this.transformDisplay(this.floor.timeUntilElevatorComes)  
      if(counter==-2){
        clearInterval(interval)
        this.mainService.HandleNextElevatorCall(assignedElevator)
        
      }

    }, 1000);
}
// this function is responsible to make the elevator sound when it's arrived to it's target floor
playElevatorArrivedSound():void{
  let audio = new Audio();
  audio.src = "../../../assets/audio/elevator_sound.mp3";
  audio.load();
  audio.play();
}
//this function uses the subject to send a signal that the movement direction of the elevator has changed
setElevatorDirection(elevator:Elevator){
  this.mainService.elevatorOnMoveDirection.next(elevator.movmentDirection)
}
}