// floor represents the state of the floor.
export class floor{
    constructor(
        // id uniquely identifies floor instance.
        public floorId:number,
        // waitingForElevatorToCome is a boolean value that track if the floor is waiting to an elevator 
        public waitingForElevatorToCome:boolean,
        // closest available elevator id to this floor instance
        public closestAvailableElevatorId:number,
        // number in seconds untill an available elevators will come and serve the floor
        public timeUntilElevatorComes:number
    ){}

}