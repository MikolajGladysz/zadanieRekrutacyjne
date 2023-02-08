import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountryListComponent } from './country-list/country-list.component';
import { DetailComponent } from './detail/detail.component';
import { RegionComponent } from './region/region.component';

const appRoutes: Routes = [
  { path: '', component: RegionComponent },
  { path: ':region', component: CountryListComponent },
  { path: ':region/:country', component: DetailComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
