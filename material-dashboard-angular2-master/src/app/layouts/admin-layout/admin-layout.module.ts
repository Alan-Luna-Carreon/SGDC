import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { RegistroProfesoresComponent } from '../../registro-profesores/registro-profesores.component';
import { ProfesoresComponent } from '../../profesores/profesores.component';
import { RegistroCursosComponent } from '../../registro-cursos/registro-cursos.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { ListaCursosComponent } from '../../lista-cursos/lista-cursos.component';
import { DetallesCursoComponent } from '../../detalles-curso/detalles-curso.component';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatDividerModule,
  MatChipsModule,
  MatIconModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatGridListModule,
  MatDialogModule,
  MatDatepickerModule
} from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatDialogModule,
    MatDividerModule,
    MatChipsModule,
    MatIconModule,
    MatDatepickerModule
  ],
  exports: [
    MatFormFieldModule,
  ],
  declarations: [
    DashboardComponent,
    RegistroProfesoresComponent,
    ProfesoresComponent,
    RegistroCursosComponent,
    ListaCursosComponent,
    DetallesCursoComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
  ]
})

export class AdminLayoutModule {}
