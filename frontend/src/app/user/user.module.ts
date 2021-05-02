import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CollectionComponent } from './collection/collection.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ImageModalComponent } from './image-modal/image-modal.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProductsComponent } from './products/products.component';
import {AuthGuardService} from '../services/auth-guard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  
import { NgxSpinnerModule } from 'ngx-spinner';
import { ViewProductComponent } from './products/view-product/view-product.component';
import { SearchFilterPipe } from '../pipes/search.pipe';
import { MyProductsComponent } from './products/my-products/my-products.component';
import { MyCollectionsComponent } from './collection/my-collections/my-collections.component';

const routes: Routes = [
  {
  path: 'profile',
  canActivate: [AuthGuardService],
  component: ProfileComponent,
  children: [
    {
      path: '', redirectTo: 'collections', pathMatch: 'full'
    },
    {
      path: 'collections', component:  CollectionComponent 
    },
    {
      path: 'products', component:  ProductsComponent 
    },
    {
      path: 'my-products', component:  MyProductsComponent 
    },
    {
      path: 'my-collections', component:  MyCollectionsComponent 
    },
  ]
}];


@NgModule({
  declarations: [
    ProfileComponent,
    CollectionComponent,
    ImageModalComponent,
    SidebarComponent,
    ProductsComponent,
    ViewProductComponent,
    SearchFilterPipe,
    MyProductsComponent,
    MyCollectionsComponent
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
export class UserModule { }
