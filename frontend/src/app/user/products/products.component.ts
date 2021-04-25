import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CollectionService } from '../../services/collection.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    this.fetchProducts();
  }

  fetchProducts() {
    this.spinnerService.show(); 
    this.collectionService.getUserCollection().subscribe((res:any)=>{
      this.myCollections = res.data;
      this.productService.getAdminProducts().subscribe((res:any)=>{
        this.allProducts = res.data;
        this.myCollections.forEach((c:any)=>{
          let myProducts:any = []
          c.products.forEach((p:any)=>{
            myProducts.push({
              ...this.allProducts.filter((ap:any)=>ap._id === p)[0],
              collectionId: c._id,
              collectionName: c.name
            });
          })
          this.myProducts = myProducts;
        })
        if(this.myProducts,this.allProducts) {
          this.setDisabledAndShowForm(this.myProducts, this.allProducts);
          setTimeout(() => {
            this.spinnerService.hide();
          }, 500);
        }
      });
    })
  }

  sortProducts(products:[],search:string) {

  }

  addProduct(productId:any) {
    const body = {
      productId: productId,
      collectionId: this.collectionForm.value.id
    }
    this.productService.addToProduct(body).subscribe((res:any)=>{
      this.fetchProducts();
    })
  }

  removeProduct(collectionId:any,productId:any) {
    this.productService.removeProduct(collectionId,productId).subscribe((res:any)=>{
      console.log(res);
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
}
