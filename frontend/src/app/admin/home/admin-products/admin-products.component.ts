import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {AdminService} from "../../../services/admin.service";
import {ProductService} from "../../../services/product.service";
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {

  allProducts:any =  []
  searchAll = '';

  productForm : FormGroup=new FormGroup({
    name: new FormControl(null,Validators.required),
    currency: new FormControl(null,Validators.required),
    price : new FormControl(null,Validators.required),
    discount : new FormControl(null,Validators.required),
    img : new FormControl(null,Validators.required),
    _id: new FormControl(null,)
  });

  showImage :boolean = true;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  imageUrl: any;
  
  constructor(
    private admin: AdminService,
    private product: ProductService,
    ) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  
  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64
  }

  addProduct() {
    let newProduct = {
      name : this.productForm.value.name,
      currency : this.productForm.value.currency,
      price : this.productForm.value.price,
      discount : this.productForm.value.discount,
      img : this.croppedImage,
      _id: this.productForm.value._id? this.productForm.value._id: null
    }
    console.log(newProduct);
    if (newProduct._id) {
      this.admin.editProduct(newProduct).subscribe((res:any)=>{
        this.fetchData();
        this.setNull();
      })
    } else {
      this.admin.addProduct(newProduct).subscribe((res:any)=>{
        this.fetchData();
        this.setNull();
      })
    }
  }

  fetchData() {
    this.product.getAdminProducts().subscribe((res:any)=>{
      this.allProducts = res.data;
      this.allProducts = this.allProducts.map((p:any)=>{
        const updated = {
          ...p,
          img: p.img.includes("http") ? p.img : environment.url + p.img
        }
        return updated;
      })
    })
  }

  editCollection(product:any){
    this.croppedImage = product.img;
    this.productForm.setValue({
      name: product.name,
      _id: product._id,
      currency: product.currency,
      price: product.price,
      discount: product.discount,
      img : product.img
    });
    document.getElementById("openModal")?.click();
  }

  removeCollection(id:any){
    this.admin.removeProduct(id).subscribe((res:any)=>{
      this.fetchData();
    })
  }

  setNull(){
    this.productForm.setValue({
      name: null,
      currency : null,
      price : null,
      discount : null,
      img : null,
      _id: null
    })
  }

}
