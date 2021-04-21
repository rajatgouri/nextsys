import { Component, OnInit } from '@angular/core';
import { CollectionService } from 'src/app/services/collection.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  collections:any = [] 
  

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
  

  constructor(private productService: ProductService, private collectionService: CollectionService) { }


  ngOnInit(): void {
   
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
   console.log(response);
    this.toast('Added To The Collection')

  })


}

}