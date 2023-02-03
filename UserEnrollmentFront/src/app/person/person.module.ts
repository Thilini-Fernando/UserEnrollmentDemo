import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonRoutingModule } from './person-routing.module';
import { PersonComponent } from './person-view/person.component';
import { PersonEditComponent } from './person-edit/person-edit.component';
import { PersonAddComponent } from './person-add/person-add.component';


@NgModule({
  declarations: [
    PersonComponent,
    PersonEditComponent,
    PersonAddComponent
  ],
  imports: [
    CommonModule,
    PersonRoutingModule
  ]
})
export class PersonModule { }
