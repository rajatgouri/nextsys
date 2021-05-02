import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../../../services/collection.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner"; 

@Component({
  selector: 'app-my-collections',
  templateUrl: './my-collections.component.html',
  styleUrls: ['./my-collections.component.scss']
})
export class MyCollectionsComponent implements OnInit {

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
    this.collectionService.getUserCollection(null).subscribe((res:any)=>{
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
}
