import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from '../../MainService.Service';

@Component({
  selector: 'app-setup-panel',
  templateUrl: './setup-panel.component.html',
  styleUrls: ['./setup-panel.component.css']
})
export class SetupPanelComponent implements OnInit {
  constructor(private mainService:MainService, private router:Router) { }

  ngOnInit(): void {
  }
  OnSubmit(form:NgForm):void{
    // set the number of floors and the number of elevators in the building 
    // to the numbers the user entered in the setup screen
      this.mainService.SetupAfterSubmit(form.value.floors,form.value.elevators)
      // after submit valid values navigate to the main elevators-system page
      this.router.navigate(["/Elevators-System"])
  }

}
