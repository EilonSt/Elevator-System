import { Building } from "./models/building.model";
import { Elevator } from "./models/elevator.model";
import { floor } from './models/floor.model';
import {cloneDeep} from 'lodash';
import { Queue } from './models/queue.model';
import { Subject } from 'rxjs';

// this service implements functions that help throughout all the project
export class MainService{
    // the building instance we use to save all the data of the floors and elevators
    private building: Building =new Building(0,0,[],[])
    // queue of the building elevators call requests
    private queue: Queue<floor>
    //listener to any change in the elevators movment
    elevatorOnMoveDirection=new Subject<string>()

    constructor(){}
    // this function initialize the building settings after the user entered the parameters of number of floors and elevators
   SetupAfterSubmit(floors:number,elevators:number):void{
         this.building.topFloor=floors
        for(let i=0 ;i< elevators;i++){
            this.building.elevators.push(new Elevator(i,0,0,0,true,0,''))
        }
        for(let i=0;i<this.building.topFloor;i++){
            this.building.floors.push(new floor(i,false,0,0))
        }
        this.queue=new Queue(this.building.topFloor)
    }
    // the function returns the number of floors in the building
    GetFloorsNumber():number{
        return this.building.topFloor
    }
    // the function returns the number of elevators in the building
    GetElevatorsNumber():number{
        return this.building.elevators.length
    }
    // the function return a copy of the floors array of the building
    GetFloors():floor[]{
        return this.building.floors.slice()
    }
    // the function return a copy of the elevators array of the building
    GetElevators():Elevator[]{
        return this.building.elevators.slice()
    }
    // the function input is an elevator id and it return the corresponding elevator instance
    GetElevatorById(ElevatorId:number):Elevator{
        return this.building.elevators[ElevatorId]
    }
    // the function input is a floor id and it return the corresponding floor instance
    GetFloorById(FloorId:number):floor{
        return this.building.floors[FloorId]
    }
// the functions returns -1 if all the elevators are unavailable
// else it returns the closest elevator id to the target floor (the least far elevator by floors) 
    GetClosestAvailableElevatorId(targetFloor:number):number{
        let ClosestElevatorId:number=-1
        let ClosestElevatorDist:number = this.building.topFloor+5
        for(let i=0;i<this.building.elevators.length;i++){
            let elevator=this.building.elevators[i]
            if(elevator.isAvailable){ //calculate the distance only if the elevator is available
               let elevatorDist:number=elevator.floorDistance(targetFloor)
                if(elevatorDist<ClosestElevatorDist){
                    ClosestElevatorDist=elevatorDist
                    ClosestElevatorId=elevator.id
                }
            }
        }
        return ClosestElevatorId
    }
    // the function assigns the closest available elevator to serve the input floor
    // or if there is not available elevator dequeue the input floor request for elevator call into the queue
    // and assigns the first elevator that will be available to serve the input floor
    InviteElevatorCall(targetFloor:number):void{
        let Floor=this.GetFloorById(targetFloor)
        let ElevatorForTargetFloor:Elevator
        let AvailableElevatorId=this.GetClosestAvailableElevatorId(targetFloor)
        if(AvailableElevatorId==-1){
            this.queue.enqueue(Floor)
            ElevatorForTargetFloor=this.NextAvailableElevator()
            Floor.closestAvailableElevatorId=ElevatorForTargetFloor.id //assigns that this elevator will serve this floor
            // add the time that will take to this elevator to serve this floor to it's
            // availablity total time until the next time it will be available
            ElevatorForTargetFloor.timeToAvailableForNextAssignment+=Math.abs(ElevatorForTargetFloor.lastAssignedTargetFloor-Floor.floorId)+2
        }
        else{
            ElevatorForTargetFloor=this.building.elevators[AvailableElevatorId]
            ElevatorForTargetFloor.isAvailable=false // now the elevator is unavailable to serve other floors
            Floor.closestAvailableElevatorId=ElevatorForTargetFloor.id //set the elevator that will serve this floor
            ElevatorForTargetFloor.currentTargetFloor=targetFloor //set this floor to the current target floor of this elevator
             // add the time that will take to this elevator to serve this floor
            ElevatorForTargetFloor.timeToAvailableForNextAssignment=ElevatorForTargetFloor.TimeToArriveToTargetFloor()
        }
        //update that the last floor that this elevator will serve is this floor and after that it will be available again
        ElevatorForTargetFloor.lastAssignedTargetFloor=targetFloor
    }
    // the function return the first elevator that will be available in the future
    NextAvailableElevator():Elevator{
        let firstAvailableElevatorIndex:number=0
        const elevatorsCurrentStateCopy=cloneDeep(this.building.elevators) // clone the current state so the calculation won't be wrong
        let minimumTimeToFinishTask:number=elevatorsCurrentStateCopy[0].TimeToAvailableForNextAssignment
        for(let i=1;i<this.building.elevators.length;i++){
             let elevatorFinishTime=elevatorsCurrentStateCopy[i].TimeToAvailableForNextAssignment
             if(elevatorFinishTime<minimumTimeToFinishTask){
                 minimumTimeToFinishTask=elevatorFinishTime
                 firstAvailableElevatorIndex=i
             }
        }
        return this.building.elevators[firstAvailableElevatorIndex]
    }
    // any elevator that finish it's task will first check if the request queue is empty.
    // if it does the elevator will be available again else it will dequeue the next request from the queue and handle it
    // also change the movment status of the elevator respectively
    HandleNextElevatorCall(elevator:Elevator):void{
           elevator.setMovementStatus()
        if(this.queue.isEmpty()){
            elevator.timeToAvailableForNextAssignment=0
            elevator.isAvailable=true
        }
        else{
            let floorToHandle= this.queue.dequeue()
            elevator.currentTargetFloor=floorToHandle.floorId 
            elevator.setMovementStatus()
        }
        this.elevatorOnMoveDirection.next(elevator.movmentDirection)
    }
}