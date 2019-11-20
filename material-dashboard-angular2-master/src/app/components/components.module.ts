import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';


import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  entryComponents: [ModalComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatIconModule,
    MatToolbarModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    ModalComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,

  ]
})
export class ComponentsModule { }
