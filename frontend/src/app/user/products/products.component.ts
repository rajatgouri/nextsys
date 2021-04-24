import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../../services/collection.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  adminCollections : any = [];
  myCollections: any = [];

  constructor(
    private collectionService : CollectionService
  ) { }

  ngOnInit(): void {
    this.collectionService.getUserCollection().subscribe((res:any)=>{
      this.myCollections = res.data;
      this.collectionService.getAdminCollection().subscribe((res:any)=>{
        this.adminCollections = res.data;
        if(this.myCollections,this.adminCollections) {
          this.setDisabled(this.myCollections, this.adminCollections);
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
        key: res.data._key,
        _id: res.data._id 
      });
      this.setDisabled(this.myCollections,this.adminCollections);
    })
  }

  removeCollection(collection:any) {
    this.collectionService.removeCollection(collection.key).subscribe((res:any)=>{
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
