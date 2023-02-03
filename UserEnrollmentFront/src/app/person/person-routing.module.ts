import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonComponent } from './person-view/person.component';

const routes: Routes = [
  { path: '', component: PersonComponent, pathMatch: 'full' }
  ]
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonRoutingModule { }
