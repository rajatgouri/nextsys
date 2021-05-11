import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CollectionService } from '../../services/collection.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { NgxSpinnerService } from "ngx-spinner";  

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  allProducts : any = [];
  searchAll = '';
  searchMy = '';
  myProducts: any = [];
  filteredMyProducts: any = [];
  myCollections: any = [];
  
  collectionForm : FormGroup=new FormGroup({
    id: new FormControl(null,Validators.required)
  });

  constructor(
    private productService : ProductService,
    private collectionService : CollectionService,
    private spinnerService: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.productService.getAdminProducts().subscribe((res:any)=>{
      this.allProducts = res.data; 
      this.allProducts = this.allProducts.map((p:any)=>{
        const updated = {
          ...p,
          img: p.img.includes("http") ? p.img : environment.url + p.img
        }
        return updated;
      });
      this.fetchProducts();
    });
  }

  toggleIcon2() {
    document.getElementById("chevronHiddenUp2")?.classList.toggle('chevron-hidden');
    document.getElementById("chevronHiddenDown2")?.classList.toggle('chevron-hidden');
  }

  fetchProducts() {
    this.spinnerService.show(); 
    this.collectionService.getUserCollection(null).subscribe((res:any)=>{
      this.myCollections = res.data;
      setTimeout(() => {
        this.spinnerService.hide();
      }, 500);
      let myProducts:any = []
      this.myCollections.forEach((c:any)=>{
        c.products.forEach((p:any)=>{
          myProducts.push({
            ...this.allProducts.filter((ap:any)=>ap._id === p)[0],
            collectionId: c._id,
            collectionName: c.name
          });
        })
        this.myProducts = myProducts;
        this.filteredMyProducts = this.myProducts;
        if(this.filteredMyProducts,this.allProducts) {
          this.setDisabledAndShowForm(this.filteredMyProducts, this.allProducts);
        }
      });
    })
  }

  addProduct(productId:any) {
    const collection = this.myCollections.filter((c:any)=>c._id===this.collectionForm.value.id)[0];
    const shouldAdd = collection? collection.products.filter((p:any)=>p===productId)[0] : false;
    if (shouldAdd) {
      this.fetchProducts();
      return ;
    } else {
      const body = {
        productId: productId,
        collectionId: this.collectionForm.value.id
      }
      this.productService.addToProduct(body).subscribe((res:any)=>{
        this.fetchProducts();
      })
    }
  }

  removeProduct(collectionId:any,productId:any) {
    this.productService.removeProduct(collectionId,productId).subscribe((res:any)=>{
      this.fetchProducts();
    })
  }

  setDisabledAndShowForm(myProducts:any[],allProducts:any[]) {
    this.allProducts = allProducts.map(c => {
      return {
        ...c,
        "disabled" : (myProducts?.includes(c._id)),
        "showForm" : false
      }
    });
  }

  toggleForm(index:any){
    this.allProducts[index].showForm =  !this.allProducts[index].showForm;
  }

  filterProducts(collectionId:any){
    this.filteredMyProducts = this.myProducts.filter((p:any) => p.collectionId === collectionId);
  }
}
