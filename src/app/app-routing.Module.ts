import {NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SetupPanelComponent} from './components/setup-panel/setup-panel.component' 
import {BuildingComponent} from './components/building/building.component' 

const appRoutes:Routes=[
    {path:'', redirectTo:'/Setup',pathMatch:'full'},
    {path:'Setup',component:SetupPanelComponent },
    {path:'Elevators-System', component:BuildingComponent},
   
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports:[RouterModule]
})

export class AppRoutingModule{
    
}