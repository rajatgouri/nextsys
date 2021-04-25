import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnInit {
  @Input() product: any ;

  constructor() { }

  ngOnInit(): void {
  }

}
