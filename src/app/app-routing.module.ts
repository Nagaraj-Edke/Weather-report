import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {SettingComponent} from './setting/setting.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component'

const routes: Routes = [
  {
    path:"",redirectTo:"/home", pathMatch:"full" // component:HomeComponent//
  },
  {
    path:"home",component:HomeComponent
  },
  {
    path:"setting",component:SettingComponent
  },
  {
    path:"**",component:PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
