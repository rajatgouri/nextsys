import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
import { CollectionService } from '../../services/collection.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner"; 
import { ProductService } from '../../services/product.service';
import { environment } from '../../../environments/environment';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {
  adminCollections : any = [{}];
  myCollections: any = [{}];
  showForm : boolean = false;
  searchAll = '';
  searchMy = '';
  allProducts : any = [];
  searchAllPro = '';
  searchMyPro = '';
  myProducts: any = [];
  filteredMyProducts: any = [];
  myCollectionsProducts: any = [];
  selectProductId = '';
  showCollections = true;
  showProducts = false;
  
  collectionForm : FormGroup=new FormGroup({
    name: new FormControl(null,Validators.required)
  });

  collectionProductForm : FormGroup=new FormGroup({
    id: new FormControl(null,Validators.required)
  });

  constructor(
    private collectionService : CollectionService,
    private spinnerService: NgxSpinnerService,
    private cdRef: ChangeDetectorRef,
    private productService : ProductService,
  ) { }

  ngOnInit(): void {
    this.spinnerService.show();
    this.collectionService.getUserCollection(null).subscribe((res:any)=>{
      this.myCollections = res.data;
      console.log(this.myCollections);
      this.productService.getAdminProducts().subscribe((res:any)=>{
        this.allProducts = res.data; 
        this.allProducts = this.allProducts.map((p:any)=>{
          const updated = {
            ...p,
            img: p.img.includes("http") ? p.img : environment.url + p.img
          }
          return updated;
        });
        console.log(this.allProducts)
        this.fetchProducts();
      });
      this.collectionService.getAdminCollection().subscribe((res:any)=>{
        this.adminCollections = res.data;
        if(this.myCollections,this.adminCollections) {
          this.setDisabled(this.myCollections, this.adminCollections);
          setTimeout(() => {
            this.spinnerService.hide();
          }, 500);
        }
      });
    })
  }

  toggleIcon2() {
    document.getElementById("chevronHiddenUp2")?.classList.toggle('chevron-hidden');
    document.getElementById("chevronHiddenDown2")?.classList.toggle('chevron-hidden');
  }

  fetchProducts() {
    this.spinnerService.show(); 
    this.collectionService.getUserCollection(null).subscribe((res:any)=>{
      this.myCollectionsProducts = res.data;
      setTimeout(() => {
        this.spinnerService.hide();
      }, 500);
      let myProducts:any = []
      this.myCollectionsProducts.forEach((c:any)=>{
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
    const collection = this.myCollectionsProducts.filter((c:any)=>c._id===this.collectionProductForm.value.id)[0];
    const shouldAdd = collection? collection.products.filter((p:any)=>p===productId)[0] : false;
    console.log(collection);
    if (shouldAdd) {
      this.fetchProducts();
      return ;
    } else {
      const body = {
        productId: productId,
        collectionId: this.collectionProductForm.value.id
      }
      this.productService.addToProduct(body).subscribe((res:any)=>{
        this.fetchProducts();
        document.getElementById("toggleButton")?.click();
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

  filterProducts(collectionId:any){
    this.filteredMyProducts = this.myProducts.filter((p:any) => p.collectionId === collectionId);
  }

  setDisabledDrag(id:any) {
    this.allProducts.map((p:any)=>{
      return {
        ...p,
        "disabled" : p._id == id ? false : true
      }
    })
  }
  
  dropProduct(event: CdkDragDrop<string[]>) {
    console.log(event.distance);
    if(event.distance.x< 445 || event.distance.y<-150){
      return;
    }
    this.selectProductId = this.allProducts[event.currentIndex]._id;
    console.log(this.selectProductId);
    document.getElementById('toggleButton')?.click();
  }

  submit(){
    this.addProduct(this.selectProductId);
    console.log(this.selectProductId)
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
 }

  toggleIcon1() {
    document.getElementById("chevronHiddenUp")?.classList.toggle('chevron-hidden');
    document.getElementById("chevronHiddenDown")?.classList.toggle('chevron-hidden');
  }

  toggle3() {
    this.showCollections = true;
    this.showProducts = false;
    document.getElementById("myCollectionHidden")?.classList.remove('chevron-block');
    document.getElementById("myCollectionHidden")?.classList.add('chevron-block');
    document.getElementById("myProductsHiddden")?.classList.add('chevron-hidden');
    document.getElementById("myProductsHiddden")?.classList.remove('chevron-block');
    document.getElementById("buttonToggle1")?.classList.add('active');
    document.getElementById("buttonToggle2")?.classList.remove('active');
  }

  toggle4() {
    this.showCollections = false;
    this.showProducts = true;
    document.getElementById("myCollectionHidden")?.classList.remove('chevron-block');
    document.getElementById("myCollectionHidden")?.classList.add('chevron-hidden');
    document.getElementById("myProductsHiddden")?.classList.add('chevron-block');
    document.getElementById("myProductsHiddden")?.classList.remove('chevron-hidden');
    document.getElementById("buttonToggle1")?.classList.remove('active');
    document.getElementById("buttonToggle2")?.classList.add('active');
  }

  addCollection(collection:any) {
    let newCollection = {
      name : collection.name,
      products: []
    }
    this.collectionService.addToCollection(newCollection).subscribe((res:any)=>{
      this.myCollections.push({
        ...newCollection,
        _key: res.data._key,
        _id: res.data._id 
      });
      this.setDisabled(this.myCollections,this.adminCollections);
    })
  }

  removeCollection(collection:any) {
    console.log(collection)
    this.collectionService.removeCollection(collection._key).subscribe((res:any)=>{
      this.myCollections = this.myCollections.filter((c:any)=>c._id!==collection._id)
      this.setDisabled(this.myCollections,this.adminCollections);
    })
  }

  setDisabled(myCollections:any[],adminCollections:any[]) {
    this.adminCollections = adminCollections.map(c => {
      return {
        ...c,
        "disabled" : (myCollections.filter(e => e.name === c.name).length > 0)
      }
    });
  }

  toggleForm(){
    this.showForm = !this.showForm;
  }

  submitForm(){
    let newCollection = {
      name : this.collectionForm.value.name,
      products: []
    }
    this.collectionService.addToCollection(newCollection).subscribe((res:any)=>{
      this.myCollections.push({
        ...newCollection,
        key: res.data._key,
        _id: res.data._id 
      });
      this.setDisabled(this.myCollections,this.adminCollections);
      this.collectionForm.setValue({
        name: null
      })
      this.showForm = !this.showForm;
    })
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log(event.distance);
    if(event.distance.x< 445 || event.distance.y<-150){
      return;
    }
    let newCollection = {
      name : this.adminCollections[event.currentIndex].name,
      products: []
    }
    this.addCollection(newCollection);

  }

  dropPhone(event: CdkDragDrop<string[]>) {
    console.log(event.currentIndex);
    if( event.distance.y<350){
      return;
    }
    let newCollection = {
      name : this.adminCollections[event.currentIndex].name,
      products: []
    }
    this.addCollection(newCollection);

  }

}
