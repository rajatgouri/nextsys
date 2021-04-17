import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { 

    route.queryParams.subscribe((params: Params) => {
      console.log(params.id)
    })

  }

  ngOnInit(): void {
  }

}
