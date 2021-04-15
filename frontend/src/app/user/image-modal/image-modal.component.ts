import { Component, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss']
})
export class ImageModalComponent implements OnInit {

  @Input() title: any;
  @Output() imageBase64String : any;

  imageChangedEvent: any = '';
  croppedImage: any = '';
  


  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }


  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  
  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64
  }

  onSelect() {
    this.activeModal.close();
  }

}
