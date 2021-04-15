import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { BrowserModule } from '@angular/platform-browser';
import { CollectionComponent } from './collection/collection.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ImageModalComponent } from './image-modal/image-modal.component';


const routes: Routes = [{
  path: 'collection',
  component: CollectionComponent
},
  {
  path: 'profile',
  component: ProfileComponent
}];


@NgModule({
  declarations: [
    ProfileComponent,
    CollectionComponent,
    ImageModalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    RouterModule,
    SlickCarouselModule,
    ImageCropperModule
  ]
})
export class UserModule { }
