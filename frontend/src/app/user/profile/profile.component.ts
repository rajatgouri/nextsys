import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ImageModalComponent } from '../image-modal/image-modal.component';
import { CollectionService } from 'src/app/services/collection.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  summerSlides: any = [];
  christmasSlides: any = [];
  profileUrl : any;
  background: any;

  
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
  
  
  constructor(
    private modalService: NgbModal,
    private collectionService: CollectionService,
    private authService:AuthService,
    private userService:UserService,
    ) { }

  
  onSaveImage() {

  }

  openModal(path: string, title: string , type: string) {

    const ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };

    const modalRef = this.modalService.open(ImageModalComponent, ngbModalOptions);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.type = type;
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
  
  
  ngOnInit(): void {
    const user:any = this.authService.getUser()
    this.userService.getImages(user.username).subscribe((res:any)=>{
      this.background = environment.url + res.data.background;
      this.profileUrl = environment.url + res.data.picture;
    })
  }


  addToCollection() {
    this.toast('Added To The Collection')
  }

}
