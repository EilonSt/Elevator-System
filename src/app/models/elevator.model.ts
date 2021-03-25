// Elevator represents the state of the elevator.
export class Elevator {
    constructor(
        // id uniquely identifies eleveator instance.
        public id: number,
        // currentFloor points to the floor being occupied by the elevator.
        public currentFloor: number,
        // currentTargetFloor tracks the current floor to get to.
        public currentTargetFloor: number,
        // lastAssignedTargetFloor tracks the floor the elevator last assigned to serve.
        public lastAssignedTargetFloor:number,
        // isAvailabe is a boolean value that determines if the elevators is available to use.
        public isAvailable: boolean,
        // timeToAvailableForNextAssignment tracks for the time in seconds that the elevator
        // will be available for another assignment including floors that it assigned after the target floor
        // (also maybe floors we pushed to the queue and after it arrived the target floor it needs to dequeue
        // and handle those requests). 
        public timeToAvailableForNextAssignment: number,
        //movmentDirection is a string that describe the direction of the elevator movment (up,down,'')
        public movmentDirection:string
    ) {}
        //the function returns the time left to the elevator to get it's target floor in secondes
        // Note: the animation takes 1 secondes to the elevator to move from floor to floor
    TimeToArriveToTargetFloor():number {
        let delta = Math.abs(this.currentFloor-this.currentTargetFloor)
        return delta+2
    }
    // the function return how much floors the elevator is far from the input floor number
    floorDistance(destenationFloor:number):number{
        let result=Math.abs(this.currentFloor-destenationFloor)
        return result
    }
    // the function is updating the elevator current floor according to it's target floor
    // Note: this function only called when the elevator get to it's current target floor
    updateCurrentFloor():number{
        return this.currentFloor=this.currentTargetFloor
    }
    // the function set the elevator movment direction
        setMovementStatus():void {
        let delta = this.currentFloor-this.currentTargetFloor
        if (delta == 0) {
            this.movmentDirection= ''
        } else if (delta < 0) {
            this.movmentDirection= 'up'
        } else {
           this.movmentDirection= 'down'
        }
    }

}