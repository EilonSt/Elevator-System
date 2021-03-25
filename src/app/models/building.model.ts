import { Elevator } from './elevator.model'
import { floor } from './floor.model';
// building represents the state of the building.
export class Building {
    constructor(
        // bottomFloor points to the lowest floor number 
        public bottomFloor: number,
        // topFloor points to the highest floor number 
        public topFloor: number,
        // Elevators is the array of all the elevators in the building
        public elevators: Elevator[],
        //floors is the array of all the floors in the building
        public floors: floor[]
    ) {}

}