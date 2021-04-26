import { Component, Input, OnInit, Output ,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss']
})
export class ImageModalComponent implements OnInit {

  @Input() title: any;
  @Input() type: any;
  @Input() imageUrl: any;
  
  showImage :boolean = true;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  


  constructor(
    public activeModal: NgbActiveModal,
    private user: UserService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }


  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    console.log(this.imageChangedEvent);
  }
  
  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64
  }

  onSelect() {
    const body = {
      base64image : this.croppedImage
    }
    if (this.type === 'profile') {
      this.user.profileUpload(body).subscribe(res=>{
        this.activeModal.close();;
      })
    } else {
      this.user.backgroundUpload(body).subscribe(res=>{
        this.activeModal.close();
      })
    }
  }

}
