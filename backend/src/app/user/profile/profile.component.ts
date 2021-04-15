import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor() { }

  slides = [
    {
      img: "http://placehold.it/350x150/000000",
      name: 'Product one ',
      price: 150,
      discount: 5,
      description: 'The description'
    },
    {
      img: "http://placehold.it/350x150/111111",
      name: 'Product one ',
      price: 150,
      discount: 5,
      description: 'The description'
    },
    {
      img: "http://placehold.it/350x150/3333333",
      name: 'Product one ',
      price: 150,
      discount: 5,
      description: 'The description'
    },
    {
      img: "http://placehold.it/350x150/666666",
      name: 'Product one ',
      price: 150,
      discount: 5,
      description: 'The description'
    },
    {
      img: "http://placehold.it/350x150/000000",
      name: 'Product one ',
      price: 150,
      discount: 5,
      description: 'The description'
    },
    {
      img: "http://placehold.it/350x150/3333333",
      name: 'Product one ',
      price: 150,
      discount: 5,
      description: 'The description'
    },
   
  ];
  
  public slideConfig: any = {
    slidesToShow: 4,
    slidesToScroll: 1,
    dots: true,
    arrows: true,
    autoplay: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 991,
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
  
  
  slickInit(e: any) {
    console.log('slick initialized');
  }
  
  breakpoint(e: any) {
    console.log('breakpoint');
  }
  
  afterChange(e: any) {
    console.log('afterChange');
  }
  
  beforeChange(e: any) {
    console.log('beforeChange');
  }

  ngOnInit(): void {
  }



}
