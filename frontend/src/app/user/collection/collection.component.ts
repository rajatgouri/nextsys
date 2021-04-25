import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../../services/collection.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner"; 

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {
  adminCollections : any = [];
  myCollections: any = [];
  showForm : boolean = false;
  searchAll = '';
  searchMy = '';
  
  collectionForm : FormGroup=new FormGroup({
    name: new FormControl(null,Validators.required)
  });

  constructor(
    private collectionService : CollectionService,
    private spinnerService: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.spinnerService.show();
    this.collectionService.getUserCollection().subscribe((res:any)=>{
      this.myCollections = res.data;
      console.log(this.myCollections);
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

}
