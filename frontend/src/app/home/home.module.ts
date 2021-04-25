import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgxSpinnerModule } from 'ngx-spinner';

const routes: Routes = [{
  path: ':username',
  component: HomeComponent
}];



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    RouterModule,
    SlickCarouselModule,
    NgxSpinnerModule
  ]
})
export class HomeModule { }
