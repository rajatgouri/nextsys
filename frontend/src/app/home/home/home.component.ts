import { Component, OnInit } from '@angular/core';
import { CollectionService } from 'src/app/services/collection.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import {ActivatedRoute , Router} from '@angular/router';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner"; 
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  collections:any = []; 
  allProducts:any = [];
  username: any;
  profile: any;
  background: any;
  

  public slideConfig: any = {
    slidesToShow: 4,
    slidesToScroll: 1,
    dots: false,
    arrows: true,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  

  constructor(
    private productService: ProductService, 
    private collectionService: CollectionService,
    private spinnerService: NgxSpinnerService,
    private router: Router,
    private userService: UserService,
    ) { }


  ngOnInit(): void {
    this.spinnerService.show(); 
    this.username = (this.router.url.slice(6));
    this.collectionService.getUserCollection(this.username).subscribe((res:any)=>{
      this.collections = res.data;
      this.productService.getAdminProducts().subscribe((res:any)=>{
        this.allProducts = res.data;
        this.userService.getImages(this.username).subscribe((res:any)=>{
          console.log(res);
          this.profile = environment.url + res.data.picture;
          this.background = environment.url  + res.data.background;
        })
        setTimeout(() => {
          this.spinnerService.hide();
        }, 500);
        this.collections.forEach((c:any)=>{
          c.products = c.products.map((id:any)=>{
            const updatedProduct = {
              ...this.allProducts.filter((ap:any)=>ap._id === id)[0]
            }
            return updatedProduct;
          })
        })
      });
    }) 
  }




slickInit(e: any) {
  console.log('slick initialized');
}


toast (text: any) {
  Swal.fire({
    text: text,
    toast: true,
    position: 'top-right',
    showConfirmButton: false,
    timer: 1500
  })
}

addToCollection(key: any) {
  this.collectionService.addToCollection(key).subscribe((response: any) => {
    this.toast('Added To The Collection')
  })


}

}