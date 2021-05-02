import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ImageCropperModule } from 'ngx-image-cropper';
import {AuthGuardService} from '../services/auth-guard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  
import { NgxSpinnerModule } from 'ngx-spinner';
import { HomeComponent } from './home/home.component';
import { AdminCollectionsComponent } from './home/admin-collections/admin-collections.component';
import { SearchAdminFilterPipe } from '../pipes/searchAdmin.pipe';
import { AdminProductsComponent } from './home/admin-products/admin-products.component';
import { UserComponent } from './home/user/user.component';
import { UserDetailsComponent} from './home/user-details/user-details.component';

const routes: Routes = [
  {
  path: 'home',
  canActivate: [AuthGuardService],
  component: HomeComponent,
  children: [
  ]
},
{
  path: 'user/:username',
  canActivate: [AuthGuardService],
  component: UserDetailsComponent,
  children: [
  ]
}];


@NgModule({
  declarations: [
    HomeComponent,
    AdminCollectionsComponent,
    SearchAdminFilterPipe,
    AdminProductsComponent,
    UserComponent,
    UserDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    RouterModule,
    SlickCarouselModule,
    ImageCropperModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule,
  ]
})
export class AdminModule{ }
