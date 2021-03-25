import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/MainService.Service';
import { floor } from 'src/app/models/floor.model';

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.css']
})
export class BuildingComponent implements OnInit {
  floors: floor[]=[]
  constructor(private mainService:MainService) { }

  ngOnInit(): void {
    this.floors=this.mainService.GetFloors()
  }

}
