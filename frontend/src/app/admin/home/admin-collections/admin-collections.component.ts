import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {AdminService} from "../../../services/admin.service";
import {CollectionService} from "../../../services/collection.service";

@Component({
  selector: 'app-admin-collections',
  templateUrl: './admin-collections.component.html',
  styleUrls: ['./admin-collections.component.scss']
})
export class AdminCollectionsComponent implements OnInit {
  
  allCollection:any =  []
  searchAll = '';
  collectionForm : FormGroup=new FormGroup({
    name: new FormControl(null,Validators.required),
    _id: new FormControl(null,)
  });
  
  constructor(
    private admin: AdminService,
    private collection: CollectionService,
    ) { }

  ngOnInit(): void {
    this.fetchData();
  }

  addCollection() {
    let newCollection = {
      name : this.collectionForm.value.name,
      products: [],
      _id: this.collectionForm.value._id? this.collectionForm.value._id: null
    }
    if (newCollection._id) {
      this.admin.editCollection(newCollection).subscribe((res:any)=>{
        this.fetchData();
        this.setNull();
      })
    } else {
      this.admin.addToCollection(newCollection).subscribe((res:any)=>{
        this.fetchData();
        this.setNull();
      })
    }
  }

  fetchData() {
    this.collection.getAdminCollection().subscribe((res:any)=>{
      this.allCollection = res.data;
    })
  }

  editCollection(collection:any){
    this.collectionForm.setValue({
      name: collection.name,
      _id: collection._id,
    });
    document.getElementById("openModal")?.click();
  }

  removeCollection(id:any){
    this.admin.removeCollection(id).subscribe((res:any)=>{
      this.fetchData();
    })
  }

  setNull(){
    this.collectionForm.setValue({
      name: null,
      _id: null
    })
  }

}
