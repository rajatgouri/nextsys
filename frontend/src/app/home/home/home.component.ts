import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  slides = [
    
    {
      img: "https://images-na.ssl-images-amazon.com/images/I/81Yqx-u2z4L._UY550_.jpg",
      name: "Goggles",
      price: 150,
      currency: 'USD',
      discount: 5,
      description: 'This product is so cool'
    },
    {
      img: "https://images-na.ssl-images-amazon.com/images/I/61jSkUzUykL._UY500_.jpg",
      name: "Goggles",
      price: 150,
      currency: 'USD',
      discount: 5,
      description: 'This product is so cool'
    },
    {
      img: "https://images-na.ssl-images-amazon.com/images/I/71UqTV-LHnL._UX569_.jpg",
      name: "Goggles",
      price: 150,
      currency: 'USD',
      discount: 5,
      description: 'This product is so cool'
    },
    {
      img: "https://images-na.ssl-images-amazon.com/images/I/71m6yJ1IUiL._UX569_.jpg",
      name: "Goggles",
      price: 150,
      currency: 'USD',
      discount: 5,
      description: 'This product is so cool'
    },
    {
      img: "https://images-na.ssl-images-amazon.com/images/I/814qtDhF22L._UY500_.jpg",
      name: "Goggles",
      price: 150,
      currency: 'USD',
      discount: 5,
      description: 'This product is so cool'
    },
    

  ];
  

  public slideConfig: any = {
    slidesToShow: 4,
    slidesToScroll: 1,
    dots: true,
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
  

  constructor() { }


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

addToCollection() {
  this.toast('Added To The Collection')
}

}