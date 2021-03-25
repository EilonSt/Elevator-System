import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppComponent } from './app.component';
import { SetupPanelComponent } from './components/setup-panel/setup-panel.component';
import { ElevatorComponent } from './components/elevator/elevator.component';
import { BuildingComponent } from './components/building/building.component';
import {MainService} from './MainService.Service'
import { AppRoutingModule } from './app-routing.Module';
import { FloorComponent } from './components/floor/floor.component';
import { ReversePipe } from './reverse.pipe';
@NgModule({
  declarations: [
    AppComponent,
    SetupPanelComponent,
    ElevatorComponent,
    BuildingComponent,
    FloorComponent,
    ReversePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [MainService],
  bootstrap: [AppComponent]
})
export class AppModule { }
