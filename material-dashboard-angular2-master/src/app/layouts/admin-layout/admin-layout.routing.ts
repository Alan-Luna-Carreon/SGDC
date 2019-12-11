import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
/* Modulos a conservar */
import { RegistroProfesoresComponent } from '../../registro-profesores/registro-profesores.component';
import { ProfesoresComponent } from '../../profesores/profesores.component';
import { RegistroCursosComponent } from '../../registro-cursos/registro-cursos.component';
import { ListaCursosComponent } from '../../lista-cursos/lista-cursos.component';
import { DetallesCursoComponent } from '../../detalles-curso/detalles-curso.component';

import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'registro-profesores',
    //   component: RegistroProfesoresComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'registro-profesores',   component: RegistroProfesoresComponent },
    { path: 'registro-profesores/:id',   component: RegistroProfesoresComponent },
    { path: 'listado-profesores',   component: ProfesoresComponent },
    { path: 'listado-cursos',   component: ListaCursosComponent },
    { path: 'registro-cursos',   component: RegistroCursosComponent },
    { path: 'registro-cursos/:id',   component: RegistroCursosComponent },
    { path: 'detalles-cursos',   component: DetallesCursoComponent },
    { path: 'registro-cursos',   component: RegistroCursosComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
];
